app
	.service('AccountService', ['Account', '$filter', '$log', function(Account, $filter, $log) {
		this.getAccounts = function() {
			return Account.getAccounts()
				.then(function(accounts) {
					return accounts.map(function(account) {
						return {
							id: parseInt(account.id, 10),
							name: account.sName
						};
					});
				})
				.catch(function(error) {
					$log.error('Cannot load accounts', error);

					return [];
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
			return Account.getBalances(account)
				.then(function(balances) {
					return balances.map(mapBalance);
				})
				.catch(function(error) {
					$log.error('Cannot load balances', error);

					return [];
				});
		};

		this.addBalance = function(balance) {
			return Account.addBalance({
				accountId: balance.accountId,
				amount: balance.amount,
				date: $filter('date')(balance.date, 'iso')
			})
				.then(function(balance) {
					return mapBalance(balance);
				})
				.catch(function(error) {
					$log.error('Cannot add balance', error);

					return balance;
				});
		};

		this.deleteBalance = function(balance) {
			return Account.deleteBalance({
				id: balance.id
			})
				.then(function(response) {
					return response;
				})
				.catch(function(error) {
					$log.error('Cannot delete balance', error);

					return {
						success: false
					};
				});
		};

		this.updateBalance = function(balance) {
			return Account.updateBalance({
				id: balance.id,
				accountId: balance.accountId,
				amount: balance.amount,
				date: $filter('date')(balance.date, 'iso')
			})
				.then(function(balance) {
					return mapBalance(balance);
				})
				.catch(function(error) {
					$log.error('Cannot update balance', error);

					return balance;
				});
		};

		var mapExpense = function(expense) {
			var mapped = {
				id: parseInt(expense.id, 10),
				title: expense.sTitle,
				amount: parseFloat(expense.fAmount),
				description: expense.sDescription,
				tags: expense.sTagList,
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
			return Account.getExpenses(account)
				.then(function(expenses) {
					return expenses.map(mapExpense);
				})
				.catch(function(error) {
					$log.error('Cannot load expenses', error);

					return [];
				});
		};

		this.addExpense = function(expense) {
			return Account.addExpense({
				accountId: expense.accountId,
				categoryId: expense.categoryId,
				title: expense.title,
				amount: expense.amount,
				description: expense.description || '',
				tags: expense.tags || '',
				date: $filter('date')(expense.date, 'iso')
			})
				.then(function(expense) {
					return mapExpense(expense);
				})
				.catch(function(error) {
					$log.error('Cannot add expense', error);

					return expense;
				});
		};

		this.deleteExpense = function(expense) {
			return Account.deleteExpense({
				id: expense.id
			})
				.then(function(response) {
					return response;
				})
				.catch(function(error) {
					$log.error('Cannot delete expense', error);

					return {
						success: false
					};
				});
		};

		this.updateExpense = function(expense) {
			return Account.updateExpense({
				accountId: expense.accountId,
				categoryId: expense.categoryId,
				id: expense.id,
				title: expense.title,
				amount: expense.amount,
				description: expense.description || '',
				tags: expense.tags || '',
				date: $filter('date')(expense.date, 'iso')
			})
				.then(function(expense) {
					return mapExpense(expense);
				})
				.catch(function(error) {
					$log.error('Cannot update expense', error);

					return expense;
				});
		};
	}]);