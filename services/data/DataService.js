app
    .factory('Data', ['$q', function($q) {
        var service = {};

        service.getCategories = function() {
            return $q.resolve(JSON.parse(Android.getCategories()));
        };

        service.addCategory = function(name) {
            return $q.resolve(JSON.parse(Android.addCategory(name)));
        };

        return service;
    }])

    .factory('DataService', ['Data', function(Data) {
        var service = {};

        var mapCategory = function(category) {
        	return {
				id: parseInt(category.id, 10),
				name: category.sName
			};
        };

        service.getCategories = function() {
            return Data.getCategories().then(function(categories) {
                return categories.map(mapCategory);
            });
        };

        service.addCategory = function(name) {
        	return Data.addCategory(name).then(function(category) {
        		return mapCategory(category);
        	});
        };

        return service;
    }]);