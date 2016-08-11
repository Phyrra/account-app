app
    .factory('Data', ['$q', function($q) {
        var service = {};

        service.getCategories = function() {
            return $q.resolve([
                {
                    id: 1,
                    name: 'Groceries'
                }, {
                    id: 2,
                    name: 'Withdrawals'
                }, {
                    id: 3,
                    name: 'Restaurant'
                }, {
                    id: 4,
                    name: 'Health Insurance'
                }, {
                    id: 5,
                    name: 'Flight'
                }, {
                    id: 6,
                    name: 'Taxes'
                }, {
                    id: 7,
                    name: 'Misc'
                }
            ]);
        };

        return service;
    }])

    .factory('DataService', ['Data', function(Data) {
        var service = {};

        service.getCategories = function() {
            return Data.getCategories();
        };

        return service;
    }]);