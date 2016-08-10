app
	.component('accountDropdown', {
		templateUrl: 'components/account-dropdown/account-dropdown.html',
		controller: 'accountDropdownController',
		controllerAs: 'accountDropdownCtrl',
		bindings: {
			model: '=ngModel'
		}
	})
	
	.controller('accountDropdownController', ['AccountService', function(AccountService) {
		var ctrl = this;
		
		ctrl.model = null;
		ctrl.showFoldout = false;
		
		ctrl.setFoldoutState = function(state) {
			ctrl.showFoldout = state;
		};
		
		ctrl.onFoldoutToggle = function() {
			ctrl.showFoldout = !ctrl.showFoldout;
		};
		
		ctrl.onAccountSelected = function(account) {
			ctrl.model = account;
			
			ctrl.setFoldoutState(false);
		};
		
		ctrl.$onInit = function() {
			AccountService.getAccounts().then(function(accounts) {
				ctrl.accounts = accounts;
				ctrl.model = ctrl.accounts[0];
			});
		};
	}]);