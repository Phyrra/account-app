app
	.service('DataService', ['Data', '$log', function(Data, $log) {
		var mapCategory = function(category) {
			return {
				id: parseInt(category.id, 10),
				name: category.sName,
				icon: category.sIcon
			};
		};

		this.getCategories = function() {
			return Data.getCategories()
				.then(function(categories) {
					return categories.map(mapCategory);
				})
				.catch(function(error) {
					$log.error('Cannot load categories', error);

					return [];
				});
		};

		this.addCategory = function(category) {
			return Data.addCategory({
				name: category.name
			})
				.then(function(category) {
					return mapCategory(category);
				})
				.catch(function(error) {
					$log.error('Cannot add category', error);

					return category;
				});
		};

		this.deleteCategory = function(category) {
			return Data.deleteCategory({
				id: category.id
			})
				.then(function(response) {
					return response;
				})
				.catch(function(error) {
					$log.error('Cannot delete category', error);

					return {
						success: false
					};
				});
		};

		this.updateCategory = function(category) {
			return Data.updateCategory({
				id: category.id,
				name: category.name,
				icon: category.icon
			})
				.then(function(category) {
					return mapCategory(category);
				})
				.catch(function(error) {
					$log.error('Cannot update category', error);

					return category;
				});
		};
	}]);