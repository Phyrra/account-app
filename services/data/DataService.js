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

        service.addCategory = function(name) {
        	return $q.resolve({
        		id: new Date().getTime(),
        		name: name
        	});
        };

        return service;
    }])

    .factory('DataService', ['Data', function(Data) {
        var service = {};

        service.getCategories = function() {
            return Data.getCategories().then(function(categories) {
                return categories.map(function(category) {
                    return {
                        id: parseInt(category.id, 10),
                        name: category.sName
                    };
                });
            });
        };

        service.addCategory = function(name) {
        	return Data.addCategory(name);
        };

        return service;
    }]);