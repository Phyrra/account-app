app
	.factory('Data', ['$q', function($q) {
		var service = {};

		service.getCategories = function() {
			return $q.resolve(JSON.parse(Android.getCategories()));
		};

		service.addCategory = function(category) {
			return $q.resolve(JSON.parse(Android.addCategory(category.name)));
		};

		service.deleteCategory = function(category) {
			return $q.resolve(JSON.parse(Android.deleteCategory(category.id)));
		};

		service.updateCategory = function(category) {
			return $q.resolve(JSON.parse(Android.updateCategory(category.id, category.name)));
		};

		return service;
	}])

	.factory('DataService', ['Data', function(Data) {
		var service = {};

		var mapCategory = function(category) {
			return {
				id: parseInt(category.id, 10),
				name: category.sName,
				icon: category.sIcon
			};
		};

		service.getCategories = function() {
			return Data.getCategories().then(function(categories) {
				return categories.map(mapCategory);
			});
		};

		service.deleteCategory = function(category) {
			return Data.deleteCategory({
				id: category.id
			}).then(function(response) {
				return response;
			});
		};

		service.addCategory = function(category) {
			return Data.addCategory({
				name: category.name
			}).then(function(category) {
				return mapCategory(category);
			});
		};

		service.updateCategory = function(category) {
			return Data.updateCategory({
				id: category.id,
				name: category.name,
				icon: category.icon
			}).then(function(category) {
				return mapCategory(category);
			});
		};

		return service;
	}]);