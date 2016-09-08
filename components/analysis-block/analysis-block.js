app
	.component('analysisBlock', {
		templateUrl: 'components/analysis-block/analysis-block.html',
		controller: 'AnalysisBlockController',
		controllerAs: 'analysisCtrl',
		bindings: {
			expenses: '<'
		}
	})

	.controller('AnalysisBlockController', ['DataService', '$timeout', '$filter', '$scope', function(DataService, $timeout, $filter, $scope) {
		var ctrl = this;

		var ANALYSIS_BLOCK_CHART = '.analysis-block-chart';

		ctrl.showContent = false;

		ctrl.onContentToggle = function() {
			ctrl.showContent = !ctrl.showContent;

			if (ctrl.showContent) {
				if (angular.isUndefined(ctrl.startDate)) {
					ctrl.startDate = ctrl.expenses[ctrl.expenses.length - 1].date;
				}

				if (angular.isUndefined(ctrl.endDate)) {
					ctrl.endDate = ctrl.expenses[0].date;
				}

				ctrl.buildChart();
			}
		};

		ctrl.buildRainbowColors = function(n) {
			var decToHex = function(value) {
				var h = value.toString(16);

				if (h.length === 1) {
					return '0' + h;
			  	}

				return h;
			}

			var frequency = Math.PI / n;

			var colors = [];
			for (var i = 0; i < n; ++i) {
			   red   = Math.floor(Math.sin(frequency * i + 0) * 127) + 128;
			   green = Math.floor(Math.sin(frequency * i + 2 * Math.PI / 3) * 127) + 128;
			   blue  = Math.floor(Math.sin(frequency * i + 4 * Math.PI / 3) * 127) + 128;

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
							return expense.categoryId === category.id && expense.date >= ctrl.startDate && expense.date <= ctrl.endDate;
						})
						.map(function(expense) {
							return expense.amount
						})
						.reduce(function(sum, value) {
							return sum + value;
						}, 0)
				];
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
				$(ANALYSIS_BLOCK_CHART)
					.empty()
					.append('<div id="analysis-pie-chart" style="height: ' + ctrl.getChartHeight() + 'px;"></div>');

				var data = ctrl.getPieChartData();
				var percentages = ctrl.getPercentages(data.columns);

				var chart = c3.generate({
					bindto: '#analysis-pie-chart',
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

				d3.select(ANALYSIS_BLOCK_CHART)
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
			return $(ANALYSIS_BLOCK_CHART).width() / 2.0;
		}

		ctrl.getChartContainerHeight = function() {
			return ctrl.getChartHeight() + ctrl.categories.length * 45; // magic number
		};

		$scope.$watch('analysisCtrl.startDate', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.buildChart();
			}
		});

		$scope.$watch('analysisCtrl.endDate', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.buildChart();
			}
		});

		ctrl.$onInit = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories;
			});
		};
	}]);