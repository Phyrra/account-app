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

	.controller('SearchFilterController', ['FuzzySearchService', function(FuzzySearchService) {
		var ctrl = this;

		var MIN_LENGTH = 3;
		var FUZZY_LIMIT = 0.75;

		var getValue = function(obj, compositeKey) {
			var keys = compositeKey.split('.');

			if (keys.length === 1) {
				return obj[keys[0]];
			}

			var iter = obj;
			keys.forEach(function(key) {
				if (angular.isDefined(iter)) {
					iter = iter[key];
				}
			});

			return iter;
		};

		var stringContains = function(src, search) {
			if (!src) {
				return false;
			}

			return src.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1;
		};

		ctrl.performSearch = function() {
			if (!ctrl.search || ctrl.search.length < MIN_LENGTH) { // catches null, undefined, ''
				ctrl.onChange({ dstModel: ctrl.model.slice() });

				return;
			}

			FuzzySearchService.configure({
				ignoreCase: true,
				minLength: MIN_LENGTH
			});

			var dstModel = ctrl.model.filter(function(element) {
				var values = ctrl.keys
					.map(function(key) {
						return getValue(element, key);
					})
					.filter(function(value) {
						return !!value;
					});

				return values.some(function(value) {
					return FuzzySearchService.getFuzzyResult(ctrl.search, value).match > FUZZY_LIMIT;
				});
			});

			ctrl.onChange({ dstModel: dstModel });
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