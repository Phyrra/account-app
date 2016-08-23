app
	.component('addExpenseButton', {
		templateUrl: 'components/add-expense-button/add-expense-button.html',
		controller: 'AddExpenseButtonController',
		controllerAs: 'buttonCtrl'
	})

	.controller('AddExpenseButtonController', ['ModalService', 'AccountService', function(ModalService, AccountService) {
	    var ctrl = this;

	    ctrl.onButtonClick = function() {
	        ModalService.open({
	        	header: 'Create',
	        	buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function(content) {
							var inputMask = content.find('.expense-input-mask');
							var inputMaskCtrl = inputMask.scope().inputMaskCtrl;

							if (!inputMaskCtrl.categoryId) {
								inputMask.find('.category .dropdown-input').addClass('required');
							}

							if (!inputMaskCtrl.amount) {
								inputMask.find('.amount input').addClass('required');
							}

							if (!inputMaskCtrl.description) {
								inputMask.find('.description textarea').addClass('required');
							}

							if (inputMaskCtrl.categoryId && inputMaskCtrl.amount && inputMaskCtrl.description && inputMaskCtrl.date) {
								AccountService.addExpense({
									accountId: ctrl.accountCtrl.selectedAccount.id,
									categoryId: inputMaskCtrl.categoryId,
									amount: inputMaskCtrl.amount,
									description: inputMaskCtrl.description,
									date: inputMaskCtrl.date
								}).then(function(expense) {
									ModalService.close();

									ctrl.accountCtrl.loadData(expense);
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
				content: '<expense-input-mask></expense-input-mask>'
	        });
	    };

		/*
		// not needed live
		$scope.$watch('buttonCtrl.accountCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.accountId = value.id;
			}
		});
		*/

	    ctrl.$onInit = function() {
	    	// TODO: this is hacky, don't know how to require ng-view controller?
	    	ctrl.accountCtrl = angular.element('div[ng-view]').scope().accountCtrl;
	    };
	}]);