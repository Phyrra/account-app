app
	.service('Data', ['$q', function($q) {
		this.getCategories = function() {
			return $q.resolve(JSON.parse(Android.getCategories()));
		};

		this.addCategory = function(category) {
			return $q.resolve(JSON.parse(Android.addCategory(category.name)));
		};

		this.deleteCategory = function(category) {
			return $q.resolve(JSON.parse(Android.deleteCategory(category.id)));
		};

		this.updateCategory = function(category) {
			return $q.resolve(JSON.parse(Android.updateCategory(category.id, category.name, category.icon)));
		};
	}]);