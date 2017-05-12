app
	.component('tagInput', {
		templateUrl: 'components/input/tag-input/tag-input.html',
		controller: 'TagInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			title: '@',
			model: '=ngModel',
			disabled: '<?ngDisabled'
		}
	})

	.controller('TagInputController', ['$element', '$timeout', function($element, $timeout) {
		var ctrl = this;

		ctrl.tags = [];
		ctrl.inputModel = '';

		ctrl.onFocus = function() {
			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.input-wrapper')
					.addClass('focus');

				$element.find('.input-wrapper-body input')
					.removeClass('required')
					.select();
			}, 0, false);
		};

		ctrl.onBlur = function() {
			ctrl.tryToAddTag(ctrl.inputModel);

			ctrl.transferTagsToModel();

			// a bit of a hack to get the animation running every time
			$timeout(function() {
				$element.find('.input-wrapper')
					.removeClass('focus');
			}, 0, false);
		};

		ctrl.tryToAddTag = function(model) {
			var trimmed = model.trim();

			if (trimmed.length > 0 && ctrl.tags.indexOf(trimmed) === -1) {
				ctrl.tags.push(trimmed);
			}

			ctrl.inputModel = '';
		};

		ctrl.transferTagsToModel = function() {
			ctrl.model = ctrl.tags.join(',');
		};

		ctrl.onChange = function(model) {
			if (model[model.length - 1] === ' ') {
				ctrl.tryToAddTag(model);
			}
		};

		ctrl.onRemoveTag = function(idx, $event) {
			ctrl.tags.splice(idx, 1);

			ctrl.transferTagsToModel();

			$event.stopPropagation();
		};

		ctrl.$onInit = function() {
			if (ctrl.model) {
				ctrl.tags = ctrl.model.split(',').map(function(tag) {
					return tag.trim();
				});
			}
		};
	}]);