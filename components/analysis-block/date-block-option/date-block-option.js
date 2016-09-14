app
	.component('dateBlockOption', {
		templateUrl: 'components/analysis-block/date-block-option/date-block-option.html',
		controller: 'DateBlockOptionController',
		controllerAs: 'optionCtrl',
		bindings: {
			dateStart: '=',
			dateEnd: '=',
			onChangeStart: '&',
			onChangeEnd: '&'
		}
	})

	.controller('DateBlockOptionController', ['$scope', function($scope) {
		var ctrl = this;

		$scope.$watch('optionCtrl.dateStart', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.onChangeStart();
			}
		});

		$scope.$watch('optionCtrl.dateEnd', function(value, oldValue) {
			if (value && value !== oldValue) {
				ctrl.onChangeEnd();
			}
		});
	}]);