app
	.component('textInput', {
		templateUrl: 'components/input/text-input/text-input.html',
		controller: 'TextInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			type: '@?',
			title: '@',
			model: '=ngModel',
			disabled: '=?ngDisabled'
		}
	})

	.controller('TextInputController', ['$element', '$timeout', function($element, $timeout) {
		var ctrl = this;

		ctrl.onFocus = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.text-input')
					.addClass('focus');

				$element.find('input')
					.removeClass('required');
			}, 0, false);
		};

		ctrl.onBlur = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.text-input')
					.removeClass('focus');
			}, 0, false);
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.type)) {
				ctrl.type = 'text';
			}
		};
	}]);