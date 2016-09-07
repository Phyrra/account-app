app
	.component('balanceBlock', {
		templateUrl: 'components/balance-block/balance-block.html',
		transclude: true,
		controller: 'BalanceBlockController',
		controllerAs: 'blockCtrl',
		require: {
			accountCtrl: '^ngController' // AccountController
		},
		bindings: {
			model: '=ngModel',
			openOnInit: '<'
		}
	})

	.controller('BalanceBlockController', ['ModalService', function(ModalService) {
		var ctrl = this;

		ctrl.showContent = ctrl.openOnInit === true;

		ctrl.onContentToggle = function() {
			ctrl.showContent = !ctrl.showContent;
		};

		ctrl.onEdit = function() {
			if (!angular.isDefined(ctrl.model.id)) {
				return;
			}

			ModalService.open({
				header: 'Edit',
				buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function(content) {
							var inputMaskCtrl = content
								.find('.balance-input-mask').scope()
								.inputMaskCtrl;

							inputMaskCtrl.validate();

							if (inputMaskCtrl.amount && inputMaskCtrl.date) {
								inputMaskCtrl.onUpdate().then(function(balance) {
									ModalService.close();

									ctrl.accountCtrl.updateBalance(balance);
								});
							}
						}
					}, {
						text: 'Cancel',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				balance: ctrl.model,
				content: '<balance-input-mask ng-model="balance"></balance-input-mask>'
			});
		};
	}]);