app
	.component('numberInput', {
		templateUrl: 'components/input/generic-input/number-input/number-input.html',
		bindings: {
			title: '@',
			model: '=ngModel',
			disabled: '=?ngDisabled'
		}
	})

    .directive('numberInputOnly', [function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModel) {
                var validate = function(value) {
                    if (!value) {
                        value = '';
                    }
                    
                    var numericOnly = value.toString().replace(/[^0-9\.]/g, '');

                    var count = 0;
                    return numericOnly.replace(/\./g, function(match) {
                        if (count++ === 0) {
                            return '.';
                        } else {
                            return '';
                        }
                    });
                };

                // gets called when model is changed from input field
                // applied to the model in the view
                ngModel.$parsers.push(function(value) {
                    var cleanValue = validate(value);

                    var srcElement = $element.get(0);

                    var oldSelection = srcElement.selectionStart;

                    $element.val(cleanValue);
                    
                    // FIXME: This will fail for type="number" (which ultimately should be used)
                    srcElement.selectionStart = oldSelection;
                    srcElement.selectionEnd = oldSelection;

                    return cleanValue;
                });

                // gets called when model is changed from outside
                // applied to the model inside the input field
                ngModel.$formatters.push(function(value) {
                    return value;
                });
            }
        }
    }]);