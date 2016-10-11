app
	.component('balanceBlock', {
		templateUrl: 'components/balance-block/balance-block.html',
		controller: 'BalanceBlockController',
		controllerAs: 'blockCtrl',
		require: {
			accountCtrl: '^^accountView' // AccountViewController
		},
		bindings: {
			model: '<ngModel',
			expenses: '<',
			openOnInit: '<',
			isLast: '<'
		}
	})

	.controller('BalanceBlockController', ['ModalService', '$scope', function(ModalService, $scope) {
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
						icon: 'fa-floppy-o',
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
						icon: 'fa-trash-o',
						action: function(content) {
							ctrl.accountCtrl.deleteBalance(ctrl.model);

							ModalService.close();
						}
					}, {
						icon: 'fa-times',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				balance: ctrl.model,
				content: '<balance-input-mask ng-model="balance"></balance-input-mask>'
			});
		};

		$scope.$watch('blockCtrl.expenses', function(value) {
			if (value) {
				ctrl.filteredExpenses = ctrl.accountCtrl.getExpensesInDateRange(ctrl.expenses, ctrl.model);
			}
		});

		ctrl.$onInit = function() {

		};
	}]);