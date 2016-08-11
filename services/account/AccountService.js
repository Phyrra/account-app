app
    .factory('Account', ['$q', function($q) {
        var service = {};

        service.getAccounts = function() {
            return $q.resolve([
                {
                    id: 1,
                    name: 'Account 1'
                }, {
                    id: 2,
                    name: 'Account 2'
                }, {
                    id: 3,
                    name: 'Account 3'
                }
            ]);
        };

        service.getExpenses = function(account) {
            return $q.resolve([
                {
                    id: 1,
                    amount: 12,
                    description: 'Flight',
                    categoryId: 5
                }, {
                    id: 2,
                    amount: 23,
                    description: 'Food',
                    categoryId: 1
                }, {
                    id: 3,
                    amount: 17,
                    description: 'Computer',
                    categoryId: 7
                }
            ]);
        };

        return service;
    }])

    .factory('AccountService', ['Account', function(Account) {
        var service = {};

        service.getAccounts = function() {
            return Account.getAccounts();
        };

        service.getExpenses = function(account) {
            return Account.getExpenses(account);
        };

        return service;
    }]);