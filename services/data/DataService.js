app
	.factory('Data', ['$http', '$q', function($http, $q) {
		var service = {};

		service.getCategories = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost/public/api/data/get-categories.php'
			}).then(function(response) {
				return response.data;
			});
		};

		service.addCategory = function(category) {
			return $http({
				method: 'POST',
				url: 'http://localhost/public/api/data/post-category.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'category-name': category.name
				},
				transformRequest: $.param
			}).then(function(response) {
				return response.data[0];
			});
		};

		service.deleteCategory = function(category) {
			return $q.resolve({
				success: true
			});
		};

		service.updateCategory = function(category) {
			return $q.resolve({
				id: category.id,
				sName: category.name,
				sIcon: category.icon
			});
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