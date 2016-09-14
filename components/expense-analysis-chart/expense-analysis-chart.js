app
	.component('expenseAnalysisChart', {
		templateUrl: 'components/expense-analysis-chart/expense-analysis-chart.html',
		controller: 'ExpenseAnalysisChartController',
		controllerAs: 'chartCtrl',
		bindings: {
			expenses: '<'
		}
	})

	.controller('ExpenseAnalysisChartController', ['DataService', '$timeout', '$filter', '$scope', '$element', 'UUID', function(DataService, $timeout, $filter, $scope, $element, UUID) {
		var ctrl = this;

		var CHART_ID = 'expense-analysis-chart-';

		ctrl.buildRainbowColors = function(n) {
			var decToHex = function(value) {
				var h = value.toString(16);

				if (h.length === 1) {
					return '0' + h;
				}

				return h;
			};

			var frequency = Math.PI / n;

			var colors = [];
			for (var i = 0; i < n; ++i) {
				red = Math.floor(Math.sin(frequency * i + 0) * 127) + 128;
				green = Math.floor(Math.sin(frequency * i + 2 * Math.PI / 3) * 127) + 128;
				blue = Math.floor(Math.sin(frequency * i + 4 * Math.PI / 3) * 127) + 128;

				colors.push('#' + decToHex(red) + decToHex(green) + decToHex(blue));
			}

			return colors;
		};

		ctrl.getPieChartData = function() {
			var columns = ctrl.categories.map(function(category) {
				return [
					category.name,
					ctrl.expenses
						.filter(function(expense) {
							return expense.categoryId === category.id;
						})
						.map(function(expense) {
							return expense.amount;
						})
						.reduce(function(sum, value) {
							return sum + value;
						}, 0)
				];
			})
			.filter(function(value) {
				return value[1] > 0;
			})
			.sort(function(a, b) {
				return a[1] < b[1] ? 1 : -1;
			});

			return {
				columns: columns
			};
		};

		ctrl.getPercentages = function(columns) {
			var sum = columns.reduce(function(iter, column) {
				return iter + column[1];
			}, 0);

			return columns.map(function(column) {
				return column[1] / sum * 100;
			});
		};

		ctrl.buildChart = function() {
			$timeout(function() { // timing hack to let ng-if draw
				$element
					.find('#' + CHART_ID + ctrl.id)
					.empty()
					.append('<div id="' + CHART_ID + ctrl.id + '-chart" style="height: ' + ctrl.getChartHeight() + 'px;"></div>');

				var data = ctrl.getPieChartData();
				var percentages = ctrl.getPercentages(data.columns);

				var chart = c3.generate({
					bindto: '#' + CHART_ID + ctrl.id + '-chart',
					data: {
						type: 'pie',
						columns: data.columns
					},
					color: {
						pattern: ctrl.buildRainbowColors(data.columns.length)
					},
					pie: {
						label: {
							show: false
						}
					},
					tooltip: {
						format: {
							title: function() {
								return 'Expenses';
							},
							value: function(value, ratio, id) {
								var filter = $filter('number');

								return filter(ratio * 100, 2) + '% (' + filter(value, 2) + 'CHF)';
							}
						}
					},
					legend: {
						show: false
					}
				});

				d3.select('#' + CHART_ID + ctrl.id)
					.insert('div')
					.attr('class', 'chart-legend')
					.insert('div')
					.attr('class', 'chart-legend-content')
					.selectAll()
					.data(data.columns.map(function(column) {
						return column[0];
					}))
					.enter()
						.append('div')
						.attr('class', 'chart-legend-label')
						.html(function(id, idx) {
							if (data.columns[idx][1] === 0) {
								return '';
							}

							return '<i class="chart-legend-label-icon" style="background-color: ' + chart.color(id) + '"></i>' +
								id +
								', ' +
								$filter('number')(percentages[idx]) + '%' +
								' ' +
								'(' + $filter('number')(data.columns[idx][1]) + 'CHF)';
						})
						.on('mouseover', function(id) {
							chart.focus(id);
						})
						.on('mouseout', function() {
							chart.revert();
						})
						.on('click', function(id) {
							chart.toggle(id);
						});
			}, 0, false);
		};

		ctrl.getChartHeight = function() {
			return $element.parent().width() / 2.0;
		};

		$scope.$watch('chartCtrl.expenses', function(value) {
			if (value && ctrl.categories && ctrl.categories.length > 0) {
				ctrl.buildChart();
			}
		});

		ctrl.$onInit = function() {
			ctrl.id = UUID();

			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories;

				ctrl.buildChart();
			});
		};
	}]);