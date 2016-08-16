app
	.component('expenseProgressChart', {
		templateUrl: 'components/expense-progress-chart/expense-progress-chart.html',
		controller: 'ExpenseProgressChartController',
		controllerAs: 'chartCtrl',
		bindings: {
			model: '<ngModel'
		}
	})

	.controller('ExpenseProgressChartController', ['UUID', '$timeout', '$filter', function(UUID, $timeout, $filter) {
		var ctrl = this;

		ctrl.id = null;

		ctrl.getColumnsData = function() {
			// build columns
			var currentBalance = ctrl.model.initialBalance.amount;
			var columns = ['data', currentBalance];

			columns = columns.concat(
				ctrl.model.expenseStack.map(function(expense) {
					currentBalance -= expense.amount;
					return currentBalance;
				})
			);

			// build labels
			var labels = [ctrl.model.initialBalance.date];

			labels = labels.concat(
				ctrl.model.expenseStack.map(function(expense) {
					return expense.date;
				})
			);

			return {
				columns: [
					columns
				],
				labels: labels.map(function(date) {
					return $filter('date')(date);
				})
			};
		};

		ctrl.$onInit = function() {
			ctrl.id = 'chart-' + UUID();

			var data = ctrl.getColumnsData();

			$timeout(function() { // little hack to let Angular draw
				c3.generate({
					bindto: '#' + ctrl.id,
					data: {
						type: 'line',
						columns: data.columns
					},
					axis: {
						x: {
							tick: {
								format: function(idx) {
									return data.labels[idx];
								}
							}
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
								return data.labels[idx];
							},
							value: function(value) {
								return $filter('number')(value);
							}
						}
					}
				});
			}, 0);
		};
	}]);