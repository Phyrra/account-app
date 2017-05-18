app
	.service('FuzzySearchService', ['StringMatcher', function(StringMatcher) {
		var config = {
			tokenize: true,
			ignoreCase: true,
			minLength: 3
		};

		this.configure = function(cfg) {
			Object.keys(cfg).forEach(function(key) {
				if (config.hasOwnProperty(key)) {
					config[key] = cfg[key];
				}
			});
		};

		var tokenize = function(term) {
			return term
				.split(' ')
				.map(function(word) {
					return word
						.replace(/\W/g, '')
						.trim();
				})
				.filter(function(word) {
					return word.length >= config.minLength;
				});
		};

		this.getFuzzyResult = function(a, b) {
			if (config.ignoreCase) {
				a = a.toLowerCase();
				b = b.toLowerCase();
			}

			if (config.tokenize) {
				var listA = tokenize(a);
				var listB = tokenize(b);

				var maxMatch = 0;
				var matches = [];

				for (var i = 0; i < listA.length; ++i) {
					for (var j = 0; j < listB.length; ++j) {
						var ai = listA[i];
						var bj = listB[j];

						var match = StringMatcher.getMatch(ai, bj);

						if (match > maxMatch) {
							maxMatch = match;
							matches = [ai, bj];
						}
					}
				}

				return {
					match: maxMatch,
					matches: matches
				};
			} else {
				return {
					match: StringMatcher.getMatch(a, b),
					matches: [a, b]
				};
			}
		};
	}]);