app
	.component('dropdownInput', {
		templateUrl: 'components/input/dropdown-input/dropdown-input.html',
		controller: 'DropdownInputController',
		controllerAs: 'inputCtrl',
		bindings: {
			model: '=ngModel',
			options: '<',
			render: '&?',
			placeholder: '@'
		}
	})
	
	.controller('DropdownInputController', ['$element', function($element) {
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
			ctrl.model = option;

			ctrl.closeFoldout();

			$element.find('.dropdown-input')
				.removeClass('required');
		};

		ctrl.renderOption = function(option, isPlaceholderAllowed) {
			if (angular.isUndefined(option)) {
			    if (isPlaceholderAllowed) {
			        if (angular.isDefined(ctrl.placeholder)) {
                        return ctrl.placeholder;
                    } else {
                        return '-- Please select --';
                    }
			    }

			    return undefined;
			}

            if (angular.isFunction(ctrl.render)) {
                return ctrl.render({ option: option });
            }

            return option.text || '&nbsp;';
		};
	}]);