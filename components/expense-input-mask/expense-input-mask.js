app
	.component('expenseInputMask', {
		templateUrl: 'components/expense-input-mask/expense-input-mask.html',
		controller: 'ExpenseInputMaskController',
		controllerAs: 'inputMaskCtrl'
	})

	.controller('ExpenseInputMaskController', ['DataService', function(DataService) {
		var ctrl = this;

		ctrl.categories = [];

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