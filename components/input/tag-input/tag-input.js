app
	.component('tagInput', {
		templateUrl: 'components/input/tag-input/tag-input.html',
		controller: 'TagInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			model: '=ngModel'
		}
	})

	.controller('TagInputController', ['$element', function($element) {
		var ctrl = this;

		ctrl.tags = [];
		ctrl.inputModel = '';

		ctrl.onFocus = function() {
			$element.find('input').focus();
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

		ctrl.onBlur = function() {
			ctrl.tryToAddTag(ctrl.inputModel);

			ctrl.transferTagsToModel();
		};

		ctrl.onRemoveTag = function(idx, $event) {
			ctrl.tags.splice(idx, 1);

			ctrl.transferTagsToModel();

			$event.stopPropagation();
		};

		ctrl.$onInit = function() {
			if (angular.isDefined(ctrl.model)) {
				ctrl.tags = ctrl.model.split(',').map(function(tag) {
					return tag.trim();
				});
			}
		};
	}]);