app
	.component('addCategoryField', {
		templateUrl: 'components/expense-filter/add-category-field/add-category-field.html',
		controller: 'AddCategoryFieldController',
		controllerAs: 'addCategoryCtrl',
		require: {
			categoryFilterCtrl: '^categoryFilter' // CategoryFilterController
		}
	})

	.controller('AddCategoryFieldController', ['DataService', function(DataService) {
		var ctrl = this;

		ctrl.addCategory = function(name) {
			DataService.addCategory({
				name: name
			}).then(function(category) {
				ctrl.categoryFilterCtrl.addCategory(category);
			});
		};
	}]);