app
	.component('dateInput', {
		templateUrl: 'components/input/date-input/date-input.html',
		controller: 'DateInputController',
		controllerAs: 'dateInputCtrl',
		bindings: {
			model: '=ngModel',
			title: '@'
		}
	})

	.controller('DateInputController', ['$scope', '$filter', function($scope, $filter) {
		var ctrl = this;

		ctrl.displayModel = '';

		ctrl.showCalendar = false;

		ctrl.onToggleCalendar = function() {
			ctrl.showCalendar = !ctrl.showCalendar;
		};

		ctrl.closeCalendar = function() {
			ctrl.showCalendar = false;
		};

		$scope.$watch('dateInputCtrl.model', function(value) {
			if (value) {
				ctrl.displayModel = $filter('date')(value);
				ctrl.closeCalendar();
			}
		});

		ctrl.$onInit = function() {
			// because of the ng-if, the init has to be done here
			// I suppose it's cleaner anyway :)
			if (angular.isUndefined(ctrl.model)) {
				ctrl.model = new Date();
			}
		};
	}]);