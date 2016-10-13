app
	.component('addDataButton', {
		templateUrl: 'components/add-data/add-data-button/add-data-button.html',
		controller: 'AddDataButtonController',
		controllerAs: 'buttonCtrl',
		require: {
			accountCtrl: '^^accountView' // AccountViewController
		}
	})

	.controller('AddDataButtonController', ['ModalService', function(ModalService) {
		var ctrl = this;

		ctrl.onButtonClick = function() {
			ModalService.open({
				header: 'Create',
				buttons: [
					{
						isPrimary: true,
						icon: 'fa-floppy-o',
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
						icon: 'fa-times',
						action: function(content) {
							ModalService.close();
						}
					}
				],
				accountId: ctrl.accountCtrl.selectedAccount.id,
				content: '<add-data-dialog account-id="accountId"></add-data-dialog>'
			});
		};
	}]);