app
	.component('balanceBlockSummary', {
		templateUrl: 'components/balance-block/balance-block-summary/balance-block-summary.html',
		controller: 'BalanceBlockSummaryController',
		controllerAs: 'summaryCtrl',
		bindings: {
			expenses: '<'
		}
	})

	.controller('BalanceBlockSummaryController', ['$scope', function($scope) {
		var ctrl = this;

		ctrl.onToggleContent = function() {
			ctrl.showContent = !ctrl.showContent;
		};

		$scope.$watch('summaryCtrl.expenses', function(value) {
			if (value) {
				ctrl.expenseSum = ctrl.expenses.reduce(function(iter, expense) {
					return iter + expense.amount;
				}, 0);
			}
		});
	}]);