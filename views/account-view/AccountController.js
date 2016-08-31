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
            if (ctrl.balances.length === 1) { // there's always at least 1 "mock" balance
                return function(expense) {
                    return true;
                }
            }
            
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

		ctrl.loadData = function(field, id) {
			$q.all({
				balances: AccountService.getBalances(ctrl.selectedAccount),
				expenses: AccountService.getExpenses(ctrl.selectedAccount)
			}).then(function(result) {
				ctrl.balances = result.balances;
				ctrl.expenses = result.expenses;

				ctrl.balances.unshift({});

				if (angular.isDefined(field) && angular.isDefined(ctrl[field])) {
					ctrl[field].some(function(obj) {
						if (obj.id === id) {
							obj.isNew = true;

							return true;
						}

						return false;
					});
				}

				// FIXME: bit of a hack to prevent animation on first load
				// the 1000 is a "measured-guess"
				setTimeout(function() {
					$('.view').addClass('animation-foldout-scroll-parent');
				}, 1000);
			});
		};

		$scope.$watch('accountCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.loadData();
			}
		});
	}]);