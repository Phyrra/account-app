app
	.service('Data', ['$http', '$q', function($http, $q) {
		this.getCategories = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost/public/api/data/get-categories.php'
			}).then(function(response) {
				return response.data;
			});
		};

		this.addCategory = function(category) {
			return $http({
				method: 'POST',
				url: 'http://localhost/public/api/data/post-category.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'name': category.name
				},
				transformRequest: $.param
			}).then(function(response) {
				return response.data[0];
			});
		};

		this.deleteCategory = function(category) {
			return $q.resolve({
				success: true
			});
		};

		this.updateCategory = function(category) {
			return $http({
				method: 'POST',
				url: 'http://localhost/public/api/data/update-category.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'category-id': category.id,
					'name': category.name,
					'icon': category.icon
				},
				transformRequest: $.param
			})
				.then(function(response) {
					return response.data[0];
				});
		};
	}]);