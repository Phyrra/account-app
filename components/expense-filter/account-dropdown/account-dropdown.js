app
	.component('accountDropdown', {
		templateUrl: 'components/expense-filter/account-dropdown/account-dropdown.html',
		controller: 'accountDropdownController',
		controllerAs: 'accountDropdownCtrl',
		bindings: {
			model: '=ngModel'
		}
	})
	
	.controller('accountDropdownController', ['AccountService', '$location', '$scope', function(AccountService, $location, $scope) {
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
		    // will trigger $routeUpdate which sets model
			$location.search('account', account.id);

			ctrl.setFoldoutState(false);
		};

		ctrl.setAccountById = function(id) {
		    ctrl.accounts.some(function(account) {
                if (account.id === id) {
                    ctrl.model = account;
                    return true;
                }
            });
		};

		$scope.$on('$routeUpdate', function() {
            var id = parseInt($location.search().account, 10);

		    ctrl.setAccountById(id);
		});
		
		ctrl.$onInit = function() {
			AccountService.getAccounts().then(function(accounts) {
				ctrl.accounts = accounts;

				if ($location.search().account) {
                    var id = parseInt($location.search().account, 10);

                    ctrl.setAccountById(id);
				}

				if (!ctrl.model) {
				    ctrl.model = ctrl.accounts[0];
				}
			});
		};
	}]);