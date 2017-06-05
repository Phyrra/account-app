app
	.service('SearchService', [function() {
		this.configure = function() {
			match.configure.apply(this, arguments);
		};

		this.filter = function(list, include, search) {
			if (!search || search.length < match.getConfig('minLength')) { // catches null, undefined, ''
				return list.slice();
			}

			return new Aggregator(list)
				.where(include, one(match(search)))
				.toArray();
		};
	}]);