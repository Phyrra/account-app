app
	.component('categoryInputMask', {
		templateUrl: 'components/expense-filter/category-input-mask/category-input-mask.html',
		controller: 'CategoryInputMaskController',
		controllerAs: 'inputMaskCtrl',
		bindings: {
			model: '<?ngModel'
		}
	})

	.controller('CategoryInputMaskController', ['DataService', '$element', function(DataService, $element) {
		var ctrl = this;

		ctrl.validate = function() {
			if (!ctrl.name) {
				$element.find('.name input').addClass('required');
			}
		};

		ctrl.onUpdate = function() {
			return DataService.updateCategory({
				id: ctrl.model.id,
				name: ctrl.name
			});
		};

		ctrl.$onInit = function() {
			if (angular.isDefined(ctrl.model)) {
				ctrl.name = ctrl.model.name;
			}
		};
	}]);