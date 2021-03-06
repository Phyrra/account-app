app
	.component('accountView', {
		templateUrl: 'components/account-view/account-view.html',
		controller: 'AccountViewController',
		controllerAs: 'accountCtrl'
	})

	.controller('AccountViewController', ['$scope', 'AccountService', '$q', '$timeout', function($scope, AccountService, $q, $timeout) {
		var ctrl = this;

		ctrl.MAX_OPEN_ON_START = 1;

		ctrl.SEARCH_KEYS = ['title', 'description'];

		ctrl.SCROLL_TO_NEW_SPEED = 300;

		ctrl.showSidebar = false;
		ctrl.showFilterMenu = false;

		ctrl.selectedAccount = null;

		ctrl.balances = [];

		ctrl.expenses = [];
		ctrl.filteredExpenses = [];
		ctrl.categoryFilteredExpenses = [];
		ctrl.searchFilteredExpenses = [];

		ctrl.onCategoryFilterChange = function(dstModel) {
			ctrl.categoryFilteredExpenses = dstModel;

			ctrl.filterExpenses();
		};

		ctrl.onSearchFilterChange = function(dstModel) {
			ctrl.searchFilteredExpenses = dstModel;

			ctrl.filterExpenses();
		};

		ctrl.filterExpenses = function() {
			var key = 'id';

			// TODO: getCommonElements destroys order
			// 		 therefore the last step is done with .filter()
			var commonFilteredExpenses = Aggregator.getCommonElements(
				key,
				new Aggregator(ctrl.categoryFilteredExpenses),
				new Aggregator(ctrl.searchFilteredExpenses)
			).toMap(key);

			ctrl.filteredExpenses = ctrl.expenses.filter(function(expense) {
				return commonFilteredExpenses.hasOwnProperty(expense[key]);
			});
		};

		ctrl.getExpensesInDateRange = function(expenses, balance) {
			return expenses.filter(function(expense) {
				if (ctrl.balances.length === 1) { // there's always at least 1 "mock" balance
					return true;
				}

				var idx = ctrl.balances.indexOf(balance);

				if (idx === -1) {
					return false;
				}

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
			});
		};

		ctrl.deleteExpense = function(expense) {
			var idx = ctrl.expenses.indexOf(expense);

			if (idx !== -1) {
				AccountService.deleteExpense(expense).then(function(response) {
					if (response.success) {
						ctrl.expenses.splice(idx, 1);

						ctrl.expenses = ctrl.expenses.slice(); // do this to trigger the update across the scopes
					}
				});
			}
		};

		ctrl.deleteBalance = function(balance) {
			var idx = ctrl.balances.indexOf(balance);

			if (idx !== -1) {
				AccountService.deleteBalance(balance).then(function(response) {
					if (response.success) {
						ctrl.balances.splice(idx, 1);

						ctrl.balances = ctrl.balances.slice(); // do this to trigger the update across the scopes
					}
				});
			}
		};

		ctrl.updateExpense = function(expense) {
			ctrl.loadData('expenses', expense.id);
		};

		ctrl.updateBalance = function(balance) {
			ctrl.loadData('balances', balance.id);
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

				$timeout(function() {
					var view = $('.view');
					var newElement = $('.is-new');

					if (newElement.length > 0) {
						var offsetView = view.offset().top;
						var offsetElement = newElement.offset().top;
						var heightElement = newElement.outerHeight();

						view.animate({
							scrollTop: offsetElement - offsetView - heightElement
						}, {
							duration: ctrl.SCROLL_TO_NEW_SPEED
						});
					}
				}, 5, false);

				// FIXME: bit of a hack to prevent animation on first load
				// the 1000 is a "measured-guess"
				setTimeout(function() {
					$('.view').addClass('animation-foldout-scroll-parent');
				}, 1000);
			});
		};

		ctrl.updateCategories = function(categories) {
			var map = {};

			categories.forEach(function(category) {
				map[category.id] = category;
			});

			ctrl.expenses.forEach(function(expense) {
				if (map[expense.categoryId]) {
					expense.category = map[expense.categoryId];
				}
			});
		};

		$scope.$watch('accountCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.loadData();
			}
		});
	}]);