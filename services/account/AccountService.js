app.factory('AccountService', ['$q', function($q) {
	var service = {};
	
	service.getAccounts = function() {
		return $q.resolve([
			{
				id: 1,
				name: 'Account 1'
			}, {
				id: 2,
				name: 'Account 2'
			}, {
				id: 3,
				name: 'Account 3'
			}
		]);
	};

	service.getExpenses = function(account) {
	    return $q.resolve([
	        {
	            id: 1,
                amount: 12,
                description: 'Flight'
	        }, {
	            id: 2,
	            amount: 23,
	            description: 'Food'
	        }, {
	            id: 3,
	            amount: 17,
	            description: 'Computer'
	        }, {
                id: 4,
                amount: 17,
                description: 'Computer'
            }, {
                id: 5,
                amount: 17,
                description: 'Computer'
            }, {
                id: 6,
                amount: 17,
                description: 'Computer'
            }, {
                 id: 7,
                 amount: 17,
                 description: 'Computer'
            }, {
                 id: 8,
                 amount: 17,
                 description: 'Computer'
            }, {
                 id: 9,
                 amount: 17,
                 description: 'Computer'
            }, {
                id: 10,
                amount: 17,
                description: 'Computer'
            }, {
                id: 11,
                amount: 17,
                description: 'Computer'
            }
	    ]);
	};
	
	return service;
}]);