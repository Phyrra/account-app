app
	.component('categoryFilter', {
		templateUrl: 'components/expense-filter/category-filter/category-filter.html',
		controller: 'CategoryFilterController',
		controllerAs: 'categoryFilterCtrl',
		bindings: {
			model: '<ngModel',
			onChange: '&'
		}
	})

	.controller('CategoryFilterController', ['DataService', function(DataService) {
		var ctrl = this;

		ctrl.categories = [];

		ctrl.loadCategories = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories;

				ctrl.selectAllCategories();
				ctrl.performFilter();
			});
		};

		ctrl.addCategory = function(category) {
			ctrl.categories.push(category);
		};

		ctrl.updateCategory = function(category) {
			for (var i = 0; i < ctrl.categories.length; ++i) {
				var cat = ctrl.categories[i];

				if (cat.id === category.id) {
					cat.name = category.name;
					cat.icon = category.icon;

					break;
				}
			}
		};

		ctrl.deleteCategory = function(category) {
			var idx = ctrl.categories.indexOf(category);

			if (idx !== -1) {
				DataService.deleteCategory(category).then(function(response) {
					if (response.success) {
						ctrl.categories.splice(idx, 1);

						ctrl.performFilter();
					}
				});
			}
		};

		ctrl.selectAllCategories = function() {
			ctrl.categories.forEach(function(category) {
				category.checked = true;
			});
		};

		ctrl.isCategorySelected = function(categoryId) {
			return ctrl.categories
				.some(function(category) {
					return category.checked === true && category.id === categoryId;
				});
		};

		ctrl.performFilter = function() {
			var filteredModel = ctrl.model.filter(function(model) {
				return ctrl.isCategorySelected(model.categoryId);
			});

			ctrl.onChange({ dstModel: filteredModel });
		};

		ctrl.$onChanges = function(changes) {
			if (changes.model) {
				ctrl.performFilter();
			}
		};

		ctrl.$onInit = function() {
			ctrl.loadCategories();
		};
	}]);