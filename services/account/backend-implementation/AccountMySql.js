app
	.service('Account', ['$http', '$q', function($http, $q) {
		this.getAccounts = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost/public/api/account/get-accounts.php'
			}).then(function(response) {
				return response.data;
			});
		};

		this.getBalances = function(account) {
			return $http({
				method: 'GET',
				url: 'http://localhost/public/api/account/get-balances.php?account-id=' + account.id
			}).then(function(response) {
				// fixing bad DB schema
				response.data.forEach(function(balance) {
					balance.fAmount = balance.fSaldo;
					delete balance.fSaldo;
				});

				return response.data;
			});
		};

		this.addBalance = function(balance) {
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
			return $http({
				method: 'GET',
			 	url: 'http://localhost/public/api/account/get-expenses.php?account-id=' + account.id
			}).then(function(response) {
			 	// This is done to match the result from the Android call
			 	return response.data.map(function(expense) {
					expense.category = {
						id: expense.idCategory,
						sName: expense.sCategoryName,
						sIcon: expense.sCategoryIcon
					};

					delete expense.sCategoryName;
					delete expense.sCategoryIcon;

					return expense;
			 	});
			});
		};

		this.addExpense = function(expense) {
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

		this.deleteExpense = function(expense) {
			return $http({
				method: 'POST',
				url: 'http://localhost/public/api/account/delete-expense.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					'expense-id': expense.id
				},
				transformRequest: $.param
			}).then(function(response) {
				return {
					success: true
				};
			});
		};

		this.updateExpense = function(expense) {
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
	}]);
