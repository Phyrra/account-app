app
	.component('textInputBox', {
		templateUrl: 'components/input/generic-input/text-input-box/text-input-box.html',
        controller: function() {
            var ctrl = this;
            
            ctrl.$onInit = function() {
                if (angular.isUndefined(ctrl.rows)) {
                    ctrl.rows = 3;
                }
            }
        },
		bindings: {
			title: '@',
			model: '=ngModel',
			disabled: '<?ngDisabled',
            rows: '@'
		}
	});