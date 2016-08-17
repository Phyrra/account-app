app
	.component('addExpenseButton', {
		templateUrl: 'components/add-expense-button/add-expense-button.html',
		controller: 'AddExpenseButtonController',
		controllerAs: 'buttonCtrl'
	})

	.controller('AddExpenseButtonController', ['ModalService', function(ModalService) {
	    var ctrl = this;

	    ctrl.onButtonClick = function() {
	        ModalService.open({
	        	header: 'Create',
	        	buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function() {
							console.log('save');
							ModalService.close();
						}
					}, {
						text: 'Cancel',
						action: function() {
							ModalService.close();
						}
					}
				],
				content: 'TODO'
	        });
	    };
	}]);