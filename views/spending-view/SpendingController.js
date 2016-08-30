app
    .controller('SpendingController', ['$scope', 'AccountService', 'DataService', '$q', '$timeout', function($scope, AccountService, DataService, $q, $timeout) {
		var ctrl = this;

		ctrl.showSidebar = false;

		ctrl.selectedAccount = null;

		ctrl.categories = [];
		ctrl.balances = [];
		ctrl.expenses = [];

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
			});

			console.log(columns);

			return {
				columns: columns
			};
		};

		ctrl.buildPieChart = function() {
			var data = ctrl.getPieChartData();

			$timeout(function() {
				c3.generate({
					bindto: '#pie-chart',
					data: {
						type: 'pie',
						columns: data.columns
					}
				});
			}, 0, false);
		};

		ctrl.loadData = function() {
			$q.all({
				categories: DataService.getCategories(),
				balances: AccountService.getBalances(ctrl.selectedAccount),
				expenses: AccountService.getExpenses(ctrl.selectedAccount)
			}).then(function(result) {
				ctrl.categories = result.categories;
				ctrl.balances = result.balances;
				ctrl.expenses = result.expenses;

				if (ctrl.expenses.length > 0) {
					ctrl.buildPieChart();
				}
			});
		};

		$scope.$watch('spendingCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.loadData();
			}
		});
	}]);