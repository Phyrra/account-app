app
	.service('DataService', ['Data', function(Data) {
		var mapCategory = function(category) {
			return {
				id: parseInt(category.id, 10),
				name: category.sName,
				icon: category.sIcon
			};
		};

		this.getCategories = function() {
			return Data.getCategories().then(function(categories) {
				return categories.map(mapCategory);
			});
		};

		this.deleteCategory = function(category) {
			return Data.deleteCategory({
				id: category.id
			}).then(function(response) {
				return response;
			});
		};

		this.addCategory = function(category) {
			return Data.addCategory({
				name: category.name
			}).then(function(category) {
				return mapCategory(category);
			});
		};

		this.updateCategory = function(category) {
			return Data.updateCategory({
				id: category.id,
				name: category.name,
				icon: category.icon
			}).then(function(category) {
				return mapCategory(category);
			});
		};
	}]);