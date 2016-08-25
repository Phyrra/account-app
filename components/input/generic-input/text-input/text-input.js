app
	.component('textInput', {
		templateUrl: 'components/input/generic-input/text-input/text-input.html',
		bindings: {
			title: '@',
			model: '=ngModel',
			disabled: '=?ngDisabled'
		}
	});