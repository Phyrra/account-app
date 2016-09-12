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
		}, {
			text: 'Restore',
			action: function() {
				Android.restoreBackupDump();

				// TODO: this is hacky, don't know how to require ng-view controller?
				angular.element('div[ng-view]').scope().accountCtrl.loadData();
			}
		}];

    	ctrl.onItemClick = function(item) {
    		if (angular.isString(item.link)) {
    			$location.url(item.link.substring(1));
    		}

    		if (angular.isFunction(item.action)) {
    			item.action();
    		}

    		ctrl.show = false;
    	};

    	ctrl.isActive = function(item) {
    		return '#' + $location.url().replace(/\?.*$/, '') === item.link;
    	};
    }]);