app
	.component('iconSearch', {
		templateUrl: 'components/expense-filter/icon-search/icon-search.html',
		controller: 'IconSearchController',
		controllerAs: 'iconSearchCtrl',
		bindings: {
			model: '<?ngModel',
			onSelect: '&?'
		}
	})

	.controller('IconSearchController', ['FontAwesomeIconService', function(FontAwesomeIconService) {
		var ctrl = this;

		ctrl.iconResults = [];

		ctrl.onChangeSearch = function(search) {
			if (search && search.length > 2) {
				var searchTerm = search.toLowerCase();

				ctrl.iconResults = ctrl.icons.filter(function(icon) {
					return icon.toLowerCase().indexOf(searchTerm) !== -1;
				});
			} else {
				ctrl.iconResults = [];
			}
		};

		ctrl.$onInit = function() {
			FontAwesomeIconService.getIcons().then(function(icons) {
				ctrl.icons = icons;
			});
		};
	}]);