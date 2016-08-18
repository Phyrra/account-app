app
    .factory('Data', ['$http', function($http) {
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
        	return $http({
        		method: 'POST',
        		url: 'http://localhost/public/api/data/post-category.php',
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
        		data: {
        			'category-name': name
        		},
        		transformRequest: $.param
        	}).then(function(response) {
        		return response.data[0];
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
        	return Data.addCategory(name).then(function(category) {
        		return {
        			id: parseInt(category.id, 10),
        			name: category.sName
        		};
        	});
        };

        return service;
    }]);