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
				idAccount: 1,
				fAmount: 12345,
				dtDate: '2016-08-01'
			}, {
				id: 2,
				idAccount: 1,
				fAmount: 23456,
				dtDate: '2016-09-01'
			}, {
				id: 3,
				idAccount: 1,
				fAmount: 34567,
				dtDate: '2016-10-01'
			}].reverse());
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
			return $q.resolve([{
				id: 1,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 12,
				sDescription: '',
				dtDate: '2016-08-02'
			}, {
				id: 2,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 32,
				sDescription: '',
				dtDate: '2016-08-05'
			}, {
				id: 3,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 23,
				sDescription: '',
				dtDate: '2016-08-08'
			}, {
				id: 4,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 15,
				sDescription: '',
				dtDate: '2016-08-12'
			}, {
				id: 5,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 20,
				sDescription: '',
				dtDate: '2016-09-03'
			}, {
				id: 6,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 20,
				sDescription: '',
				dtDate: '2016-09-07'
			},{
				id: 7,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 20,
				sDescription: '',
				dtDate: '2016-09-09'
			},{
				id: 8,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 23,
				sDescription: '',
				dtDate: '2016-09-12'
			}, {
				id: 9,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 10,
				sDescription: '',
				dtDate: '2016-09-16'
			}, {
				id: 10,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 17,
				sDescription: '',
				dtDate: '2016-09-23'
			}, {
				id: 11,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 20,
				sDescription: '',
				dtDate: '2016-09-27'
			}, {
				id: 12,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch',
				fAmount: 19,
				sDescription: '',
				dtDate: '2016-10-02'
			}, {
				id: 13,
				idAccount: 1,
				idCategory: 1,
				sTitle: 'Lunch in the future',
				fAmount: 1,
				sDescription: '',
				dtDate: '2017-01-01'
			}].reverse());
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