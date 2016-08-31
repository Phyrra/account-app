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
			return {
				columns: ctrl.expenses.slice().reverse().map(function(expense) {
					return expense.amount;
				}),
				labels: ctrl.expenses.slice().reverse().map(function(expense) {
					return $filter('date')(expense.date);
				}),
				region: ctrl.expenses.slice().reverse().map(function(expense, idx) {
					return expense.id === ctrl.model.id ? idx : -1;
				}).filter(function(i) {
					return i !== -1;
				})[0]
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

			$element.on('mousedown touchstart', function(event) {
				event.preventDefault();
				event.stopPropagation();

				swiping = true;

				startX = event.clientX;
				curX = event.clientX;
				curTimeStamp = event.timeStamp;

				initialX = $element.offset().left - parent.offset().left;
			});

			$element.on('mousemove touchmove', function(event) {
				event.preventDefault();

				if (swiping) {
					var newX = event.clientX;
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
						columns: [
							['data'].concat(ctrl.chartData.columns)
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
						start: ctrl.chartData.region - 0.5,
						end: ctrl.chartData.region + 0.5,
						class: 'current-expense'
					}]
				});

				ctrl.initSliding($('#' + ctrl.id));
			}, 0, false);
		};
	}]);