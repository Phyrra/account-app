app
	.component('addInputField', {
		templateUrl: 'components/input/add-input-field/add-input-field.html',
		controller: 'AddInputFieldController',
		controllerAs: 'inputCtrl',
		bindings: {
			onSubmit: '='
		}
	})

	.controller('AddInputFieldController', ['$element','$timeout', '$scope', function($element, $timeout, $scope) {
		var ctrl = this;

		ctrl.isOpen = false;

		ctrl.onFocusSelect = function() {
			$element.find('.add-button-input')
				.select();
		};

		ctrl.onBlurClose = function() {
			ctrl.isOpen = false;
		};

		ctrl.onClickPlus = function() {
			if (ctrl.isOpen) {
				if (ctrl.model && ctrl.model.length > 0) {
					ctrl.onSubmit(ctrl.model);

					ctrl.model = '';
				}

				ctrl.isOpen = false;
			} else {
				ctrl.isOpen = true;

				$timeout(function() {
					$element.find('.add-button-input')
						.focus();
				}, 0, false);
			}
		};

		$scope.$on('document-click', function($event, event) {
			var $target = $(event.target);

			if (!$target.isOrChildOf('add-input-field')) {
				$timeout(function() {
					ctrl.onBlurClose();
				}, 0);
			}
		});
	}])

	.animation('.add-button-input', ['FOLDOUT_ANIMATION_DURATION', function() {
		var DURATION = 500;
		var TARGET_WIDTH = 150;

		return {
			enter: function(element, done) {
				element
					.css('width', 0)
					.animate({
						width: TARGET_WIDTH
					}, {
						duration: DURATION,
						done: done
					});
			},

			leave: function(element, done) {
				element
					.animate({
						width: 0
					}, {
						duration: DURATION,
						done: done
					});
			}
		};
	}]);