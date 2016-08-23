app
	.component('dropdownInput', {
		templateUrl: 'components/input/dropdown-input/dropdown-input.html',
		controller: 'DropdownInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			model: '=ngModel',
			options: '<',
			placeholder: '@'
		}
	})
	
	.controller('DropdownInputController', [function() {
		var ctrl = this;

		ctrl.showFoldout = false;

		ctrl.display = '';

		ctrl.closeFoldout = function() {
			ctrl.showFoldout = false;
		};

		ctrl.onFoldoutToggle = function() {
			ctrl.showFoldout = !ctrl.showFoldout;
		};

		ctrl.onOptionSelected = function(option) {
			ctrl.model = option.value;
			ctrl.display = option.text;

			ctrl.closeFoldout();
		};

		ctrl.evalDisplayText = function() {
			if (angular.isUndefined(ctrl.model)) {
				if (angular.isDefined(ctrl.placeholder)) {
					ctrl.display = ctrl.placeholder;
				} else {
					ctrl.display = '-- Please select --';
				}

				return;
			}

			ctrl.options.some(function(option) {
				if (ctrl.model === option.value) {
					ctrl.display = option.text;
				}
			});
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.model) && ctrl.options.length > 0) {
				ctrl.model = ctrl.options[0].value;
			}

			ctrl.evalDisplayText();
		};
	}]);