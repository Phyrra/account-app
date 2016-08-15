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

        return service;
    }]);