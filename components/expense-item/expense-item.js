app
	.component('expenseItem', {
		templateUrl: 'components/expense-item/expense-item.html',
		controller: 'expenseItemController',
		controllerAs: 'expenseItemCtrl',
		require: {
			accountCtrl: '^^accountView' // AccountViewController
		},
		bindings: {
			model: '<ngModel',
			isLastBlock: '<'
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
						icon: 'fa-floppy-o',
						action: function(content) {
							var inputMaskCtrl = content
								.find('.expense-input-mask').scope()
								.inputMaskCtrl;

							inputMaskCtrl.validate();

							if (inputMaskCtrl.categoryId && inputMaskCtrl.amount && inputMaskCtrl.title && inputMaskCtrl.date) {
								inputMaskCtrl.onUpdate().then(function(expense) {
									ctrl.accountCtrl.updateExpense(expense);

									ModalService.close();
								});
							}
						}
					}, {
						icon: 'fa-trash-o',
						action: function(content) {
							ctrl.accountCtrl.deleteExpense(ctrl.model);

							ModalService.close();
						}
					}, {
						icon: 'fa-times',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				expense: ctrl.model,
				content: '<expense-input-mask ng-model="expense"></expense-input-mask>'
			});
		};

		var entityMap = {
            '<': '&lt;',
            '>': '&gt;'
        };

        function escapeHtml (string) {
            return string.replace(/[<>]/g, function(s) {
                return entityMap[s];
            });
        }

        ctrl.$onChanges = function(changes) {
            if (changes.model) {
                ctrl.displayDescription = escapeHtml(changes.model.currentValue.description).replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
        };
	}]);