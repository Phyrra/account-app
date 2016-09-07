app
    .factory('Account', ['$http', '$q', function($http, $q) {
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

        service.addBalance = function(balance) {
        	return $http({
        		method: 'POST',
        		url: 'http://localhost/public/api/account/post-balance.php',
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        		},
        		data: {
        			'account-id': balance.accountId,
        			'amount': balance.amount,
        			'date': balance.date
        		},
        		transformRequest: $.param
        	}).then(function(response) {
        		return response.data[0];
        	});
        };

        service.deleteExpense = function(expense) {
        	return $http({
        		method: 'POST',
        		url: 'http://localhost/public/api/account/delete-expense.php',
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        		},
        		data: {
        			'account-id': expense.accountId,
        			'expense-id': expense.id
        		},
        		transformRequest: $.param
        	}).then(function(response) {
        		return {
        			success: true
        		};
        	});
        };

        service.updateExpense = function(expense) {
        	return $http({
				method: 'POST',
				url: 'http://localhost/public/api/account/update-expense.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'expense-id': expense.id,
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

        service.updateBalance = function(balance) {
        	return $q.resolve({
        		id: balance.id,
        		idAccount: balance.accountId,
        		fAmount: balance.amount,
        		dtDate: balance.date
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
				amount: parseFloat(balance.fSaldo),
				date: new Date(balance.dtDate)
			};
        };

        service.getBalances = function(account) {
            return Account.getBalances(account).then(function(balances) {
                return balances.map(mapBalance);
            });
        };

        service.addBalance = function(balance) {
        	return Account.addBalance({
        		accountId: balance.accountId,
        		amount: balance.amount,
        		date: $filter('date')(balance.date, 'iso')
        	}).then(function(balance) {
        		return mapBalance(balance);
        	});
        };

        service.updateBalance = function(balance) {
        	return Account.updateBalance({
        		id: balance.id,
        		accountId: balance.accountId,
        		amount: balance.amount,
        		date: $filter('date')(balance.date, 'iso')
        	}).then(function(balance) {
        		return mapBalance(balance);
        	});
        };

		var mapExpense = function(expense) {
			return {
				id: parseInt(expense.id, 10),
				title: expense.sTitle,
				amount: parseFloat(expense.fAmount),
				description: expense.sDescription,
				categoryId: parseInt(expense.idCategory, 10),
				accountId: parseInt(expense.idAccount, 10),
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

        service.deleteExpense = function(expense) {
        	return Account.deleteExpense({
        		accountId: expense.accountId,
        		id: expense.id
        	}).then(function(response) {
        		return response;
        	});
        };

        service.updateExpense = function(expense) {
        	return Account.updateExpense({
        		accountId: expense.accountId,
        		categoryId: expense.categoryId,
        		id: expense.id,
        		title: expense.title,
        		amount: expense.amount,
        		description: expense.description,
        		date: $filter('date')(expense.date, 'iso')
        	}).then(function(expense) {
        		return mapExpense(expense);
        	});
        };

        return service;
    }]);