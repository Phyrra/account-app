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

		ctrl.items = [];

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