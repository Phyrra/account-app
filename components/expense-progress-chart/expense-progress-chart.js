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

		ctrl.sliceWidth = 75;
		ctrl.swipeFadeout = 500;

		ctrl.getChartData = function() {
			var column = [];
			var labels = [];
			var regionIdx = -1;

			var tmpExpenses = ctrl.expenses.slice().reverse();
			var curIdx = 0;

			var tmpBalances = ctrl.balances.slice(1).reverse(); // remove the "mock"
			var balanceIdx = [];

			var current;
			var lastDate;

			var filter = $filter('date');

			tmpBalances
				.forEach(function(balance, idx) {
					column.push(balance.amount);
					labels.push(filter(balance.date));
					balanceIdx.push(column.length - 1);

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
								column[column.length - 1] = current;
							} else {
								column.push(current);
								labels.push(filter(expense.date));
							}

							if (ctrl.model.id === expense.id) {
								regionIdx = column.length - 1;
							}
						}
					}
				});

			return {
				column: column,
				balanceIdx: balanceIdx,
				labels: labels,
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
						left: cropValue($element.offset().left - parent.offset().left + swipeXSpeed * ctrl.swipeFadeout)
					}, {
						duration: ctrl.swipeFadeout,
						easing: 'linear'
					});
				}

				swiping = false;
			});
		};

		ctrl.$onInit = function() {
			ctrl.id = 'chart-' + UUID();
			ctrl.chartData = ctrl.getChartData();

			$timeout(function() { // little hack to let Angular draw
				c3.generate({
					bindto: '#' + ctrl.id,
					data: {
						type: 'line',
						xs: {
							'data1': 'x1',
							'data2': 'x2'
						},
						columns: [
							['x1'].concat(ctrl.chartData.column.map(function(value, idx) { return idx; })),
							['data1'].concat(ctrl.chartData.column),

							['x2'].concat(ctrl.chartData.balanceIdx),
							['data2'].concat(ctrl.balances.slice(1).reverse().map(function(balance) { return balance.amount; }))
						]
					},
					axis: {
						x: {
							tick: {
								culling: {
									max: 1
								},
								format: function(idx) {
									return ctrl.chartData.labels[idx];
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
								return ctrl.chartData.labels[idx];
							},
							value: function(value) {
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
					$element.css('left', -ctrl.chartData.regionIdx * ctrl.sliceWidth + $element.parent().outerWidth() / 4.0);
				}

				ctrl.initSliding($element);
			}, 0, false);
		};
	}]);