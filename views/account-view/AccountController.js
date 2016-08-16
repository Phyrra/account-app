app
    .controller('AccountController', ['$scope', 'AccountService', '$q', function($scope, AccountService, $q) {
		var ctrl = this;

		ctrl.MAX_OPEN_ON_START = 5;

		ctrl.showSidebar = false;
		ctrl.showFilterMenu = false;

		ctrl.selectedAccount = null;

		ctrl.balances = [];

		ctrl.expenses = [];
		ctrl.filteredExpenses = [];

		ctrl.getExpensesInDateRange = function(balance) {
			var idx = ctrl.balances.indexOf(balance);

			if (idx === -1) {
				return function(expense) {
					return false;
				};
			}

			return function(expense) {
				if (idx === 0) {
					// idx 0 is a "mock" balance to catch all the newest expenses
					var lastBalance = ctrl.balances[1];

					return expense.date >= lastBalance.date;
				} else if (idx === ctrl.balances.length - 1) {
					return expense.date < balance.date;
				} else {
					var previousBalance = ctrl.balances[idx + 1];

					return expense.date >= previousBalance.date && expense.date < balance.date;
				}
			};
		};

		ctrl.deleteExpense = function(expense) {
			var idx = ctrl.expenses.indexOf(expense);

			if (idx !== -1) {
				ctrl.expenses.splice(idx, 1);
				ctrl.expenses = ctrl.expenses.slice(0); // do this to trigger the update across the scopes
			}
		};

		$scope.$watch('accountCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				$q.all({
					balances: AccountService.getBalances(value),
					expenses: AccountService.getExpenses(value)
				}).then(function(result) {
					ctrl.balances = result.balances;
					ctrl.expenses = result.expenses;

					ctrl.balances.unshift({});
				});
			}
		});
	}]);