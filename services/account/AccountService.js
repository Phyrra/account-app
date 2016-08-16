app
    .factory('Account', ['$http', function($http) {
        var service = {};

        service.getAccounts = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost/public/api/account/get-accounts.php'
            }).then(function(response) {
                return response.data;
            });
        };

        service.getBalances = function(account) {
            return $http({
                method: 'GET',
                url: 'http://localhost/public/api/account/get-balances.php?account-id=' + account.id
            }).then(function(response) {
                return response.data;
            });
        };

        service.getExpenses = function(account) {
            return $http({
                method: 'GET',
                url: 'http://localhost/public/api/account/get-expenses.php?account-id=' + account.id
            }).then(function(response) {
                return response.data;
            });
        };

        return service;
    }])

    .factory('AccountService', ['Account', function(Account) {
        var service = {};

        service.getAccounts = function() {
            return Account.getAccounts().then(function(accounts) {
                return accounts.map(function(account) {
                    return {
                        id: parseInt(account.id, 10),
                        name: account.sName
                    };
                });
            });
        };

        service.getBalances = function(account) {
            return Account.getBalances(account).then(function(balances) {
                return balances.map(function(balance) {
                    return {
                        id: parseInt(balance.id, 10),
                        accountId: parseInt(balance.idAccount, 10),
                        amount: parseFloat(balance. fSaldo),
                        date: new Date(balance.dtDate)
                    };
                });
            });
        };

        service.getExpenses = function(account) {
            return Account.getExpenses(account).then(function(expenses) {
                return expenses.map(function(expense) {
                    return {
                        id: parseInt(expense.id, 10),
                        amount: parseFloat(expense.fAmount),
                        description: expense.sDescription,
                        categoryId: parseInt(expense.idCategory, 10),
                        date: new Date(expense.dtDate)
                    };
                });
            });
        };

        return service;
    }]);