app
	.component('contentTabs', {
		templateUrl: 'components/add-data/content-tabs/content-tabs.html',
		controller: 'ContentTabsController',
		controllerAs: 'tabsCtrl',
		bindings: {
			model: '=ngModel',
			tabs: '<'
		}
	})

	.controller('ContentTabsController', [function() {
		var ctrl = this;

		ctrl.onTabSelect = function(tab) {
			ctrl.model = tab.value;
			ctrl.display = tab.text;
		};

		ctrl.setDisplay = function() {
			ctrl.tabs.some(function(tab) {
				if (ctrl.model === tab.value) {
					ctrl.display = tab.text;
				}
			});
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.model) && ctrl.tabs.length > 0) {
				ctrl.model = ctrl.tabs[0].value;
			}

			ctrl.setDisplay();
		}
	}]);