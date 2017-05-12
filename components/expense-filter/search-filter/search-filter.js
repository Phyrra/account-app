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

	.controller('SearchFilterController', [function() {
	    var ctrl = this;

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
	        if (!ctrl.search) { // catches null, undefined, ''
	            ctrl.onChange({ dstModel: ctrl.model.slice() });

	            return;
	        }

            var searchStrings = ctrl.search.split(' ')
                .map(function(search) {
                    return search.trim();
                })
                .filter(function(search) {
                    return search.length > 0; // TODO: Maybe > 3?
                });

	        var dstModel = ctrl.model.filter(function(element) {
	            return ctrl.keys.some(function(key) {
	                var value = getValue(element, key);

	                // Binds the searches as "or"
	                return searchStrings.some(function(search) {
	                    return stringContains(value, search);
	                });
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