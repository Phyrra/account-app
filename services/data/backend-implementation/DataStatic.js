app
	.service('Data', ['$q', function($q) {
		this.getCategories = function() {
			return $q.resolve([{
				id: 1,
				sName: 'Groceries',
				sIcon: 'shopping-cart'
			}, {
				id: 2,
				sName: 'Lunch',
				sIcon: 'cutlery'
			}]);
		};

		this.addCategory = function(category) {
			return $q.resolve({
				id: new Date().getTime(),
				sName: category.name
			});
		};

		this.deleteCategory = function(category) {
			return $q.resolve({
				success: true
			});
		};

		this.updateCategory = function(category) {
			return $q.resolve({
				id: category.id,
				sName: category.name,
				sIcon: category.icon
			});
		};
	}]);