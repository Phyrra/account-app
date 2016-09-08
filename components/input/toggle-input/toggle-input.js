app
	.component('toggleInput', {
		templateUrl: 'components/input/toggle-input/toggle-input.html',
		controller: 'ToggleInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			model: '=ngModel',
			onValue: '@?',
			offValue: '@?',
			disabled: '<ngDisabled'
		}
	})

	.controller('ToggleInputController', [function() {
		var ctrl = this;

		ctrl.values = [];
		ctrl.state = 0;

		ctrl.onToggle = function() {
			if (ctrl.disabled) {
				return;
			}

			ctrl.state = 1 - ctrl.state;
			ctrl.model = ctrl.values[ctrl.state];
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.offValue)) {
				ctrl.offValue = false;
			}

			if (angular.isUndefined(ctrl.onValue)) {
				ctrl.onValue = true;
			}

			ctrl.values = [
				ctrl.offValue,
				ctrl.onValue
			];

			ctrl.state = ctrl.model === ctrl.onValue ? 1 : 0;
			ctrl.model = ctrl.values[ctrl.state];
		};
	}]);