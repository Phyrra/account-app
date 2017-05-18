app
	.service('FuzzySearchService', ['StringMatcher', function(StringMatcher) {
		var config = {
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

		var joinWithMatch = function(tokens, matchIdx) {
			return tokens
				.map(function(token, i) {
					if (i === matchIdx) {
						return '<b>' + token + '</b>';
					}

					return token;
				})
				.join(' ');
		};

		var getSubstringMatch = function(needleTokens, haystack) {
			var directMatch = null;

			needleTokens.some(function(needle, i) {
				var idx = haystack.indexOf(needle);

				if (idx !== -1) {
					directMatch = {
						match: 1,
						matches: [
							joinWithMatch(needleTokens, i),
							haystack.substring(0, idx) + '<b>' + haystack.substring(idx, idx + needle.length) + '</b>' + haystack.substring(idx + needle.length)
						]
					};

					return true;
				}

				return false;
			});

			return directMatch;
		};

		var getClosestWordMatch = function(needleTokens, haystackTokens) {
			var maxMatch = 0;
			var maxMatchesIdx = [];

			for (var i = 0; i < needleTokens.length; ++i) {
				for (var j = 0; j < haystackTokens.length; ++j) {
					var a = needleTokens[i];
					var b = haystackTokens[j];

					var match = StringMatcher.getMatch(a, b);

					if (match > maxMatch) {
						maxMatch = match;
						maxMatchesIdx = [i, j];
					}
				}
			}

			return {
				match: maxMatch,
				matches: [
					joinWithMatch(needleTokens, maxMatchesIdx[0]),
					joinWithMatch(haystackTokens, maxMatchesIdx[1])
				]
			};
		};

		this.getFuzzyResult = function(needle, haystack) {
			if (config.ignoreCase) {
				needle = needle.toLowerCase();
				haystack = haystack.toLowerCase();
			}

			var needleTokens = tokenize(needle);

			var substringMatch = getSubstringMatch(needleTokens, haystack);
			if (substringMatch) {
				return substringMatch;
			}

			var haystackTokens = tokenize(haystack);

			return getClosestWordMatch(needleTokens, haystackTokens);
		};
	}]);