app
	.service('AccountService', ['Account', '$filter', function(Account, $filter) {
		this.getAccounts = function() {
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
				amount: parseFloat(balance.fAmount),
				date: new Date(balance.dtDate)
			};
		};

		this.getBalances = function(account) {
			return Account.getBalances(account).then(function(balances) {
				return balances.map(mapBalance);
			});
		};

		this.addBalance = function(balance) {
			return Account.addBalance({
				accountId: balance.accountId,
				amount: balance.amount,
				date: $filter('date')(balance.date, 'iso')
			}).then(function(balance) {
				return mapBalance(balance);
			});
		};

		this.deleteBalance = function(balance) {
			return Account.deleteBalance({
				id: balance.id
			}).then(function(response) {
				return response;
			});
		};

		this.updateBalance = function(balance) {
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
			var mapped = {
				id: parseInt(expense.id, 10),
				title: expense.sTitle,
				amount: parseFloat(expense.fAmount),
				description: expense.sDescription,
				categoryId: parseInt(expense.idCategory, 10),
				accountId: parseInt(expense.idAccount, 10),
				date: new Date(expense.dtDate),
				category: {}
			};

			if (expense.hasOwnProperty('category')) {
				mapped.category = {
					id: parseInt(expense.category.id, 10),
					name: expense.category.sName,
					icon: expense.category.sIcon
				};
			}

			return mapped;
		};

		this.getExpenses = function(account) {
			return Account.getExpenses(account).then(function(expenses) {
				return expenses.map(mapExpense);
			});
		};

		this.addExpense = function(expense) {
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

		this.deleteExpense = function(expense) {
			return Account.deleteExpense({
				id: expense.id
			}).then(function(response) {
				return response;
			});
		};

		this.updateExpense = function(expense) {
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
	}]);