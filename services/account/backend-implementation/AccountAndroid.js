app
	.service('Account', ['$q', function($q) {
		this.getAccounts = function() {
			return $q.resolve(JSON.parse(Android.getAccounts()));
		};

		this.getBalances = function(account) {
			return $q.resolve(JSON.parse(Android.getBalances(account.id)));
		};

		this.addBalance = function(balance) {
			return $q.resolve(JSON.parse(Android.addBalance(balance.accountId, balance.amount, balance.date)));
		};

		this.deleteBalance = function(balance) {
			return $q.resolve(JSON.parse(Android.deleteBalance(balance.id)));
		};

		this.updateBalance = function(balance) {
			return $q.resolve(JSON.parse(Android.updateBalance(balance.id, balance.accountId, balance.amount, balance.date)));
		};

		this.getExpenses = function(account) {
			return $q.resolve(JSON.parse(Android.getExpenses(account.id)));
		};

		this.addExpense = function(expense) {
			return $q.resolve(JSON.parse(Android.addExpense(expense.accountId, expense.categoryId, expense.amount, expense.date, expense.description, expense.title)));
		};

		this.deleteExpense = function(expense) {
			return $q.resolve(JSON.parse(Android.deleteExpense(expense.id)));
		};

		this.updateExpense = function(expense) {
			return $q.resolve(JSON.parse(Android.updateExpense(expense.id, expense.accountId, expense.categoryId, expense.amount, expense.date, expense.description, expense.title)));
		};
	}])