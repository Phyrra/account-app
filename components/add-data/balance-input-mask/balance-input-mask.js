app
	.component('balanceInputMask', {
		templateUrl: 'components/add-data/balance-input-mask/balance-input-mask.html',
		controller: 'BalanceInputMaskController',
		controllerAs: 'inputMaskCtrl'
	})

	.controller('BalanceInputMaskController', ['AccountService', '$element', function(AccountService, $element) {
		var ctrl = this;

		ctrl.onCreate = function(accountId) {
			return AccountService.addBalance({
				accountId: accountId,
				amount: ctrl.amount,
				date: ctrl.date
			});
		};

		ctrl.validate = function() {
			if (!ctrl.amount) {
				$element.find('.amount input').addClass('required');
			}
		};
	}]);