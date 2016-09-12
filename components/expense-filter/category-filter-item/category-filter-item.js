app
	.component('categoryFilterItem', {
		templateUrl: 'components/expense-filter/category-filter-item/category-filter-item.html',
		controller: 'CategoryFilterItemController',
		controllerAs: 'itemCtrl',
		require: {
			categoryFilterCtrl: '^^categoryFilter' // CategoryFilterController
		},
		bindings: {
			model: '<ngModel'
		}
	})

	.controller('CategoryFilterItemController', ['ModalService', function(ModalService) {
		var ctrl = this;

		ctrl.onEdit = function() {
			ModalService.open({
				header: 'Edit',
				buttons: [
					{
						isPrimary: true,
						text: 'Save',
						action: function(content) {
							var inputMaskCtrl = content
								.find('.category-input-mask').scope()
								.inputMaskCtrl;

							inputMaskCtrl.validate();

							if (inputMaskCtrl.name) {
								inputMaskCtrl.onUpdate().then(function(category) {
									ctrl.categoryFilterCtrl.updateCategory(category);

									ModalService.close();
								});
							}
						}
					}, {
						text: 'Delete',
						action: function(content) {
							ctrl.categoryFilterCtrl.deleteCategory(ctrl.model);

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
				content: '<category-input-mask ng-model="expense"></category-input-mask>'
			});
		};

		ctrl.toggleCategory = function() {
			ctrl.model.checked = !ctrl.model.checked;

			ctrl.categoryFilterCtrl.performFilter();
		};
	}]);