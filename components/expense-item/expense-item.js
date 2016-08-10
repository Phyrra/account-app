app
	.component('expenseItem', {
		templateUrl: 'components/expense-item/expense-item.html',
		controller: 'expenseItemController',
		controllerAs: 'expenseItemCtrl',
		require: {
		    accountCtrl: '^ngController' // AccountController
		},
		bindings: {
			model: '<?ngModel'
		}
	})
	
	.controller('expenseItemController', [function() {
		var ctrl = this;

		ctrl.showDetail = false;

		ctrl.toggleDetail = function() {
		    ctrl.showDetail = !ctrl.showDetail;
		};
		
		ctrl.$onInit = function() {
			// nothing
		};
	}]);