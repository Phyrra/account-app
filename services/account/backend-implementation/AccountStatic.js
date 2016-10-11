app
	.service('Account', ['$q', function($q) {
		this.getAccounts = function() {
			return $q.resolve([{
				id: 1,
				sName: 'Account'
			}]);
		};

		this.getBalances = function(account) {
			return $q.resolve([{
				id: 1,
				accountId: 1,
				fAmount: 12345,
				dtDate: '2016-08-01'
			}, {
				id: 2,
				accountId: 1,
				fAmount: 23456,
				dtDate: '2016-09-01'
			}]);
		};

		this.addBalance = function(balance) {
			return $q.resolve({
				id: new Date().getTime(),
				accountId: balance.accountId,
				fAmount: balance.amount,
				dtDate: balance.date
			});
		};

		this.deleteBalance = function(balance) {
			return $q.resolve({
				success: true
			});
		};

		this.updateBalance = function(balance) {
			return $q.resolve({
				id: balance.id,
				idAccount: balance.accountId,
				fAmount: balance.amount,
				dtDate: balance.date
			});
		};

		this.getExpenses = function(account) {
			return $q.resolve([{}]);
		};

		this.addExpense = function(expense) {
			return $q.resolve({
				id: new Date().getTime(),
				idAccount: expense.accountId,
				idCategory: expense.categoryId,
				sTitle: expense.title,
				fAmount: expense.amount,
				sDescription: expense.description,
				dtDate: expense.date
			});
		};

		this.deleteExpense = function(expense) {
			return $q.resolve({
				success: true
			});
		};

		this.updateExpense = function(expense) {
			return $q.resolve({
				id: expense.id,
				idAccount: expense.accountId,
				idCategory: expense.categoryId,
				sTitle: expense.title,
				fAmount: expense.amount,
				sDescription: expense.description,
				dtDate: expense.date
			});
		};
	}]);