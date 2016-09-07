app
	.component('expenseItem', {
		templateUrl: 'components/expense-item/expense-item.html',
		controller: 'expenseItemController',
		controllerAs: 'expenseItemCtrl',
		require: {
		    accountCtrl: '^ngController' // AccountController
		},
		bindings: {
			model: '<?ngModel'
		}
	})
	
	.controller('expenseItemController', ['ModalService', function(ModalService) {
		var ctrl = this;

		ctrl.showDetail = false;

		ctrl.onToggleDetail = function() {
		    ctrl.showDetail = !ctrl.showDetail;
		};

		ctrl.onEdit = function() {
			ModalService.open({
				header: 'Edit',
				buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function(content) {
							var inputMaskCtrl = content
								.find('.expense-input-mask').scope()
								.inputMaskCtrl;

							inputMaskCtrl.validate();

							if (inputMaskCtrl.categoryId && inputMaskCtrl.amount && inputMaskCtrl.title && inputMaskCtrl.date) {
								inputMaskCtrl.onUpdate().then(function(expense) {
									ModalService.close();

									ctrl.accountCtrl.updateExpense(expense);
								});
							}
						}
					}, {
						text: 'Delete',
						action: function(content) {
							ctrl.accountCtrl.deleteExpense(ctrl.model);

							ModalService.close();
						}
					}, {
						text: 'Cancel',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				expense: ctrl.model,
				content: '<expense-input-mask ng-model="expense"></expense-input-mask>'
			});
		};
		
		ctrl.$onInit = function() {
			// nothing
		};
	}]);