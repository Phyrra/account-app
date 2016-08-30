app
    .component('appSidebar', {
        templateUrl: 'components/app-sidebar/app-sidebar.html',
        controller: 'AppSidebarController',
        controllerAs: 'sidebarCtrl',
        transclude: true,
        bindings: {
            show: '='
        }
    })

    .controller('AppSidebarController', ['$location', function($location) {
    	var ctrl = this;

    	ctrl.items = [{
    		link: '#/account',
    		text: 'Account'
    	}, {
    		link: '#/spending',
    		text: 'Spending'
    	}];

    	ctrl.isActive = function(item) {
    		return '#' + $location.url().replace(/\?.*$/, '') === item.link;
    	};
    }]);