app
    .factory('Account', ['$q', function($q) {
        var service = {};

        service.getAccounts = function() {
            return $q.resolve(JSON.parse(Android.getAccounts()));
        };

        service.getBalances = function(account) {
            return $q.resolve(JSON.parse(Android.getBalances(account.id)));
        };

        service.getExpenses = function(account) {
            return $q.resolve(JSON.parse(Android.getExpenses(account.id)));
        };

        service.addExpense = function(expense) {
            return $q.resolve(JSON.parse(Android.addExpense(expense.accountId, expense.categoryId, expense.amount, expense.date, expense.description, expense.title)))
        };

        service.addBalance = function(balance) {
            return $q.resolve(JSON.parse(Android.addBalance(balance.accountId, balance.amount, balance.date)));
        };

        service.deleteExpense = function(expense) {
            return $q.resolve({ success: false });
        };

        service.updateExpense = function(expense) {
            return $q.resolve({ success: false });
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

        service.addBalance = function(balance) {
        	return Account.addBalance({
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