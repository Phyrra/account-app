app
    .controller('AccountController', ['$scope', 'AccountService', function($scope, AccountService) {
            var ctrl = this;

            ctrl.showSidebar = false;
            ctrl.showFilterMenu = false;

            ctrl.selectedAccount = null;

            $scope.$watch('accountCtrl.selectedAccount', function(value, oldValue) {
                if (value && value !== oldValue) {
                    AccountService.getExpenses(value).then(function(expenses) {
                        ctrl.expenses = expenses
                    });
                }
            });

            ctrl.expenses = [];
            ctrl.filteredExpenses = [];

            ctrl.deleteExpense = function(expense) {
                var idx = ctrl.expenses.indexOf(expense);

                if (idx !== -1) {
                    ctrl.expenses.splice(idx, 1);
                    ctrl.expenses = ctrl.expenses.slice(0); // do this to trigger the update across the scopes
                }
            };
        }]);