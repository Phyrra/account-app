app
	.component('expenseInputMask', {
		templateUrl: 'components/add-data/expense-input-mask/expense-input-mask.html',
		controller: 'ExpenseInputMaskController',
		controllerAs: 'inputMaskCtrl'
	})

	.controller('ExpenseInputMaskController', ['DataService', '$scope', '$filter', function(DataService, $scope, $filter) {
		var ctrl = this;

		ctrl.categories = [];

		$scope.$watch('inputMaskCtrl.date', function(value) {
			if (value) {
				ctrl.dateModel = $filter('date')(value);
			}
		});

		ctrl.$onInit = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories.map(function(category) {
					return {
						value: category.id,
						text: category.name
					};
				});
			});
		};
	}]);