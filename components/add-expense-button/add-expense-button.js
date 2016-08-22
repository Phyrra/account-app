app
	.component('addExpenseButton', {
		templateUrl: 'components/add-expense-button/add-expense-button.html',
		controller: 'AddExpenseButtonController',
		controllerAs: 'buttonCtrl'
	})

	.controller('AddExpenseButtonController', ['ModalService', '$scope', function(ModalService, $scope) {
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

		$scope.$watch('buttonCtrl.accountCtrl.selectedAccount', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.accountId = value.id;
			}
		});

	    ctrl.$onInit = function() {
	    	// this is hacky, don't know how to require ng-view controller?
	    	ctrl.accountCtrl = angular.element('div[ng-view]').scope().accountCtrl;
	    };
	}]);