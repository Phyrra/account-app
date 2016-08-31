app
	.component('analysisBlock', {
		templateUrl: 'components/analysis-block/analysis-block.html',
		controller: 'AnalysisBlockController',
		controllerAs: 'analysisCtrl',
		bindings: {
			expenses: '='
		}
	})

	.controller('AnalysisBlockController', ['DataService', '$timeout', '$filter', function(DataService, $timeout, $filter) {
		var ctrl = this;

		ctrl.showContent = false;

		ctrl.onContentToggle = function() {
			ctrl.showContent = !ctrl.showContent;

			if (ctrl.showContent) {
				ctrl.buildChart();
			}
		};

		// http://nikolay.rocks/2015-10-29-rainbows-generator-in-javascript
		// don't really like it :/
		ctrl.buildRainbowColors = function(n) {
			var sinToHex = function(i, phase) {
				var sin = Math.sin(Math.PI / n * 2 * i + phase);
				var int = Math.floor(sin * 127) + 128;
				var hex = int.toString(16);

				return hex.length === 1 ? '0' + hex : hex;
			};

			var colors = [];

			for (var i = 0; i < n; ++i) {
				var r = sinToHex(i, 0 * Math.PI * 2.0 / 3.0); // 0 deg
				var g = sinToHex(i, 1 * Math.PI * 2.0 / 3.0); // 120 deg
				var b = sinToHex(i, 2 * Math.PI * 2.0 / 3.0); // 240 deg

				colors.push('#' + r + g + b);
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

		ctrl.buildChart = function() {
			$timeout(function() { // timing hack to let ng-if draw
				var data = ctrl.getPieChartData();

				c3.generate({
					bindto: '#analysis-pie-chart',
					data: {
						type: 'pie',
						columns: data.columns
					},
					color: {
						pattern: ctrl.buildRainbowColors(data.columns.length).reverse()
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

								return filter(ratio, 2) + '% (' + filter(value, 2) + 'CHF)';
							}
						}
					}
				});
			}, 0, false);
		};

		ctrl.getChartHeight = function() {
			return $('#analysis-pie-chart').width() / 2.0;
		};

		ctrl.$onInit = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories;
			});
		};
	}]);