app
	.component('searchFilter', {
		templateUrl: 'components/expense-filter/search-filter/search-filter.html',
		controller: 'SearchFilterController',
		controllerAs: 'searchFilterCtrl',
		bindings: {
			model: '<ngModel',
			keys: '<',
			onChange: '&'
		}
	})

	.controller('SearchFilterController', ['SearchService', function(SearchService) {
		var ctrl = this;

		var MIN_LENGTH = 3;
		var FUZZY_LIMIT = 0.75;

		ctrl.performSearch = function() {
			ctrl.onChange({
				dstModel: SearchService.filter(ctrl.model, ctrl.keys, ctrl.search)
			});
		};

		ctrl.clearSearch = function() {
			ctrl.search = '';

			ctrl.performSearch();
		};

		ctrl.$onChanges = function(changes) {
			if (changes.model) {
				ctrl.performSearch();
			}
		};
	}]);