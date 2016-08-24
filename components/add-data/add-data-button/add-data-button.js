app
	.component('addDataButton', {
		templateUrl: 'components/add-data/add-data-button/add-data-button.html',
		controller: 'AddDataButtonController',
		controllerAs: 'buttonCtrl'
	})

	.controller('AddDataButtonController', ['ModalService', function(ModalService) {
	    var ctrl = this;

	    ctrl.onButtonClick = function() {
	        ModalService.open({
	        	header: 'Create',
	        	buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function(content) {
							content
								.find('.add-data-dialog').scope()
								.addDataCtrl.onClickSave()
								.then(function(response) {
									if (response.success) {
										ModalService.close();

										ctrl.accountCtrl.loadData(response.field, response.id);
									}
								});
						}
					}, {
						text: 'Cancel',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				accountId: ctrl.accountCtrl.selectedAccount.id,
				content: '<add-data-dialog account-id="accountId"></add-data-dialog>'
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