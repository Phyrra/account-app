app
	.component('addExpenseButton', {
		templateUrl: 'components/add-expense-button/add-expense-button.html',
		controller: 'AddExpenseButtonController',
		controllerAs: 'buttonCtrl'
	})

	.controller('AddExpenseButtonController', [function() {
	    var ctrl = this;

	    ctrl.onButtonClick = function() {
	        console.log('clicked');
	    };
	}]);