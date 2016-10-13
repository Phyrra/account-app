app
	.component('expenseProgressChart', {
		templateUrl: 'components/expense-progress-chart/expense-progress-chart.html',
		controller: 'ExpenseProgressChartController',
		controllerAs: 'chartCtrl',
		bindings: {
			balances: '<',
			expenses: '<',
			model: '<ngModel'
		}
	})

	.controller('ExpenseProgressChartController', ['UUID', '$timeout', '$filter', '$document', function(UUID, $timeout, $filter, $document) {
		var ctrl = this;

		ctrl.id = null;

		ctrl.SLICE_WIDTH = 66;
		ctrl.SWIPE_FADEOUT = 500;

		ctrl.getColumnData = function() {
			var column = [];
			var regionIdx = -1;

			var tmpExpenses = ctrl.expenses.slice().reverse();
			var curIdx = 0;

			var tmpBalances = ctrl.balances.slice(1).reverse(); // remove the "mock"

			var current;
			var lastDate;

			var filter = $filter('date');

			tmpBalances
				.forEach(function(balance, idx) {
					column.push({
						amount: balance.amount,
						date: balance.date
					});

					current = balance.amount;
					lastDate = balance.date;

					var next = idx < tmpBalances.length - 1 ? tmpBalances[idx + 1] : null;

					for (; curIdx < tmpExpenses.length; ++curIdx) {
						var expense = tmpExpenses[curIdx];

						if (next !== null && expense.date >= next.date) {
							break;
						}

						if (expense.date >= balance.date) {
							current -= expense.amount;

							if (lastDate.getTime() === expense.date.getTime()) {
								column[column.length - 1].amount = current;
							} else {
								column.push({
									amount: current,
									date: expense.date
								});

								lastDate = expense.date;
							}

							if (ctrl.model.id === expense.id) {
								regionIdx = column.length - 1;
							}
						}
					}
				});

			return {
				column: column,
				regionIdx: regionIdx
			};
		};

		ctrl.initSliding = function($element) {
			var swiping = false;
			var initialX;
			var startX;
			var curX;
			var curTimeStamp;
			var swipeXSpeed;

			var parent = $element.parent();

			var cropValue = function(value) {
				return Math.max(
					parent.outerWidth() - $element.outerWidth(),
					Math.min(
						0,
						value
					)
				);
			};

			// fix initial scroll
			$element.css('left', cropValue($element.offset().left - parent.offset().left));

			$element.on('mousedown touchstart', function(event) {
				event.preventDefault();
				event.stopPropagation();

				swiping = true;

				startX = event.clientX || event.originalEvent.touches[0].clientX;
				curX = startX;
				curTimeStamp = event.timeStamp;

				initialX = $element.offset().left - parent.offset().left;
			});

			$element.on('mousemove touchmove', function(event) {
				event.preventDefault();

				if (swiping) {
					var newX = event.clientX || event.originalEvent.touches[0].clientX;
					var timeStamp = event.timeStamp;

					swipeXSpeed = (newX - curX) / (timeStamp - curTimeStamp);
					curX = newX;

					curTimeStamp = timeStamp;

					$element.css('left', cropValue(initialX + curX - startX));
				}
			});

			$document.on('mouseup touchend', function() {
				if (swiping) {
					$element.animate({
						left: cropValue($element.offset().left - parent.offset().left + swipeXSpeed * ctrl.SWIPE_FADEOUT)
					}, {
						duration: ctrl.SWIPE_FADEOUT,
						easing: 'linear'
					});
				}

				swiping = false;
			});
		};

		ctrl.prepareChartDataWithSpacing = function(columnData) {
			var day0;
			if (columnData.column.length > 0) {
				day0 = columnData.column[0].date;
			}

			var dateDiff = function(date1, date2) {
				var timeDiff = date2.getTime() - date1.getTime();
				return Math.ceil(timeDiff / (1000 * 3600 * 24));
			};

			var x1 = columnData.column.map(function(value) {
				return dateDiff(day0, value.date);
			});

			var data1 = columnData.column.map(function(value) {
				return value.amount;
			});

			var balances = ctrl.balances.slice(1).reverse();

			var x2 = balances.map(function(balance) {
				return dateDiff(day0, balance.date);
			});

			var data2 = balances.map(function(balance) {
				return balance.amount;
			});

			var data1Labels = [];
			var xLabels = [];
			columnData.column.forEach(function(value) {
				var label = $filter('date')(value.date);

				data1Labels.push(label);

				var idx = dateDiff(day0, value.date);
				xLabels[idx] = label;
			});

			var data2Labels = balances.map(function(balance) {
				return $filter('date')(balance.date);
			});

			var regionIdx = dateDiff(day0, columnData.column[columnData.regionIdx].date);

			return {
				x1: x1,
				data1: data1,
				x2: x2,
				data2: data2,
				labels: {
					xLabels: xLabels,
					data1: data1Labels,
					data2: data2Labels
				},
				regionIdx: regionIdx,
				chartWidth: xLabels.length * ctrl.SLICE_WIDTH
			};
		};

		ctrl.$onInit = function() {
			ctrl.id = 'chart-' + UUID();

			var columnData = ctrl.getColumnData();
			ctrl.chartData = ctrl.prepareChartDataWithSpacing(columnData);

			$timeout(function() { // little hack to let Angular draw
				c3.generate({
					bindto: '#' + ctrl.id,
					data: {
						xs: {
							'data1': 'x1',
							'data2': 'x2'
						},
						columns: [
							['x1'].concat(ctrl.chartData.x1),
							['data1'].concat(ctrl.chartData.data1),

							['x2'].concat(ctrl.chartData.x2),
							['data2'].concat(ctrl.chartData.data2)
						],
						types: {
							data1: 'line',
							data2: 'line'
						}
					},
					axis: {
						x: {
							padding: {
								left: 0.5,
								right: 0.5
							},
							tick: {
								culling: {
									max: 1
								},
								format: function(x) {
									return ctrl.chartData.labels.xLabels[x];
								}
							}
						},
						y: {
							show: false
						}
					},
					legend: {
						show: false
					},
					tooltip: {
						format: {
							title: function() {
								return 'Balance';
							},
							name: function(name, ratio, id, idx) {
								return ctrl.chartData.labels[id][idx];
							},
							value: function(value, ratio, id) {
								return $filter('number')(value);
							}
						}
					},
					regions: [{
						axis: 'x',
						start: ctrl.chartData.regionIdx - 0.5,
						end: ctrl.chartData.regionIdx + 0.5,
						class: 'current-expense'
					}]
				});

				var $element = $('#' + ctrl.id);

				if (ctrl.chartData.regionIdx !== -1) {
					$element.css('left', -ctrl.chartData.regionIdx * ctrl.SLICE_WIDTH + $element.parent().outerWidth() / 4.0);
				}

				ctrl.initSliding($element);
			}, 0, false);
		};
	}]);