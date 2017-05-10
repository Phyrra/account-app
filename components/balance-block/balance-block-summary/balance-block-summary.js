app
	.component('balanceBlockSummary', {
		templateUrl: 'components/balance-block/balance-block-summary/balance-block-summary.html',
		controller: 'BalanceBlockSummaryController',
		controllerAs: 'summaryCtrl',
		bindings: {
			expenses: '<'
		}
	})

	.controller('BalanceBlockSummaryController', [function() {
		var ctrl = this;

		ctrl.onToggleContent = function() {
			ctrl.showContent = !ctrl.showContent;
		};

        ctrl.$onChanges = function(changes) {
            if (changes.expenses) {
                ctrl.expenseSum = changes.expenses.currentValue.reduce(function(iter, expense) {
                    return iter + expense.amount;
                }, 0);
            }
        };
	}]);