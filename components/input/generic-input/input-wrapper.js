app
	.component('inputWrapper', {
		templateUrl: 'components/input/generic-input/input-wrapper.html',
        transclude: true,
		controller: 'InputWrapperController',
		controllerAs: 'inputCtrl',
		bindings: {
			title: '@',
			model: '=ngModel',
			disabled: '<?ngDisabled'
		}
	})

	.controller('InputWrapperController', ['$element', '$timeout', function($element, $timeout) {
		var ctrl = this;

		ctrl.onFocus = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.input-wrapper')
					.addClass('focus');

				$element.find('.input-wrapper-body > *')
					.removeClass('required')
                    .select();
			}, 0, false);
		};

		ctrl.onBlur = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.input-wrapper')
					.removeClass('focus');
			}, 0, false);
		};

		ctrl.$onInit = function() {
			// inject this controller into parent scope
			$element.scope().inputCtrl = ctrl;
		};
	}]);