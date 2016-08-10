app
    .component('accountHeader', {
        templateUrl: 'components/account-header/account-header.html',
        transclude: true,
        controller: 'AccountHeaderController',
        controllerAs: 'headerCtrl',
        bindings: {
            showSidebar: '=',
            showFilterMenu: '='
        }
    })

    .controller('AccountHeaderController', ['$scope', '$timeout', function($scope, $timeout) {
        var ctrl = this;

        ctrl.hideSidebar = function() {
            ctrl.showSidebar = false;
        };

        ctrl.onToggleSidebar = function() {
            ctrl.showSidebar = !ctrl.showSidebar;
        };

        ctrl.onToggleFilterMenu = function() {
            ctrl.showFilterMenu = !ctrl.showFilterMenu;
        };

        $scope.$on('document-click', function($event, event) {
            var $target = $(event.target);

            if (!$target.isOrChildOf('.app-sidebar') && !$target.isOrChildOf('.account-header > .fa-bars')) {
                $timeout(function() {
                    ctrl.hideSidebar();
                }, 0);
            }
        });
    }]);