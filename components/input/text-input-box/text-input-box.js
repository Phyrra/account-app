app
	.component('textInputBox', {
		templateUrl: 'components/input/text-input-box/text-input-box.html',
		controller: 'TextInputBoxController',
		controllerAs: 'inputCtrl',
		bindings: {
			title: '@',
			rows: '@?',
			model: '=ngModel',
			disabled: '=?ngDisabled'
		}
	})

	.controller('TextInputBoxController', ['$element', '$timeout', function($element, $timeout) {
		var ctrl = this;

		ctrl.onFocus = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.text-input-box')
					.addClass('focus');
			}, 0, false);
		};

		ctrl.onBlur = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.text-input-box')
					.removeClass('focus');
			}, 0, false);
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.rows)) {
				ctrl.rows = '3';
			}
		};
	}]);