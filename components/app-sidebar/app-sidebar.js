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
    		text: 'Account',
    		link: '#/',
    		action: function() {
    			$location.url('/');
    		}
    	}, {
			text: 'Backup',
			action: function() {
				Android.createBackupDump();
			}
		}];

    	ctrl.isActive = function(item) {
    		return '#' + $location.url().replace(/\?.*$/, '') === item.link;
    	};
    }]);