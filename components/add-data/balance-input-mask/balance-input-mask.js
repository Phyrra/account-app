app
	.component('balanceInputMask', {
		templateUrl: 'components/add-data/balance-input-mask/balance-input-mask.html',
		controller: 'BalanceInputMaskController',
		controllerAs: 'inputMaskCtrl',
		bindings: {
			model: '<?ngModel'
		}
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

		ctrl.onUpdate = function() {
			return AccountService.updateBalance({
				id: ctrl.model.id,
				accountId: ctrl.model.accountId,
				amount: ctrl.amount,
				date: ctrl.date
			});
		};

		ctrl.validate = function() {
		    var valid = true;

			if (!ctrl.amount) {
				$element.find('.amount input').addClass('required');

				valid = false;
			}

			return valid;
		};

		ctrl.$onInit = function() {
			if (angular.isDefined(ctrl.model)) {
				ctrl.amount = ctrl.model.amount;
				ctrl.date = ctrl.model.date;
			}
		};
	}]);