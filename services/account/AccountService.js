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

        service.addExpense = function(expense) {
        	return $http({
				method: 'POST',
				url: 'http://localhost/public/api/account/post-expense.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'account-id': expense.accountId,
					'category-id': expense.categoryId,
					'title': expense.title,
					'amount': expense.amount,
					'description': expense.description,
					'date': expense.date
				},
				transformRequest: $.param
			}).then(function(response) {
				return response.data[0];
			});
        };

        return service;
    }])

    .factory('AccountService', ['Account', '$filter', function(Account, $filter) {
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

        var mapBalance = function(balance) {
        	return {
				id: parseInt(balance.id, 10),
				accountId: parseInt(balance.idAccount, 10),
				amount: parseFloat(balance. fSaldo),
				date: new Date(balance.dtDate)
			};
        };

        service.getBalances = function(account) {
            return Account.getBalances(account).then(function(balances) {
                return balances.map(mapBalance);
            });
        };

		var mapExpense = function(expense) {
			return {
				id: parseInt(expense.id, 10),
				title: expense.sTitle,
				amount: parseFloat(expense.fAmount),
				description: expense.sDescription,
				categoryId: parseInt(expense.idCategory, 10),
				date: new Date(expense.dtDate)
			};
		};

        service.getExpenses = function(account) {
            return Account.getExpenses(account).then(function(expenses) {
                return expenses.map(mapExpense);
            });
        };

        service.addExpense = function(expense) {
        	return Account.addExpense({
        		accountId: expense.accountId,
        		categoryId: expense.categoryId,
        		title: expense.title,
        		amount: expense.amount,
        		description: expense.description ? expense.description : '',
        		date: $filter('date')(expense.date, 'iso')
        	}).then(function(expense) {
        		return mapExpense(expense);
        	});
        };

        return service;
    }]);