app
	.service('SearchService', [function() {
		var config = {
			ignoreCase: true,
			minLength: 3,
			fuzzyLimit: 0.75
		};

		this.configure = function(cfg) {
			Object.keys(cfg).forEach(function(key) {
				if (config.hasOwnProperty(key)) {
					config[key] = cfg[key];
				}
			});
		};

		var getDeepValue = function(obj, deepKey) {
			var keys = deepKey.split('.');

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

		// https://github.com/jordanthomas/jaro-winkler
		var getJaroMatch = function(s1, s2) {
			var m = 0;
			var i;
			var j;

			// Exit early if either are empty.
			if (s1.length === 0 || s2.length === 0) {
				return 0;
			}

			// Exit early if they're an exact match.
			if (s1 === s2) {
				return 1;
			}

			var range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1;
			var s1Matches = new Array(s1.length);
			var s2Matches = new Array(s2.length);

			for (i = 0; i < s1.length; i++) {
				var low = (i >= range) ? i - range : 0;
				var high = (i + range <= (s2.length - 1)) ? (i + range) : (s2.length - 1);

				for (j = low; j <= high; j++) {
					if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
						++m;
						s1Matches[i] = s2Matches[j] = true;
						break;
					}
				}
			}

			// Exit early if no matches were found.
			if (m === 0) {
				return 0;
			}

			// Count the transpositions.
			var k = 0;
			var numTrans = 0;

			for (i = 0; i < s1.length; i++) {
				if (s1Matches[i] === true) {
					for (j = k; j < s2.length; j++) {
						if (s2Matches[j] === true) {
							k = j + 1;
							break;
						}
					}

					if (s1[i] !== s2[j]) {
						++numTrans;
					}
				}
			}

			var weight = (m / s1.length + m / s2.length + (m - (numTrans / 2)) / m) / 3;
			var l = 0;
			var p = 0.1;

			if (weight > 0.7) {
				while (s1[l] === s2[l] && l < 4) {
					++l;
				}

				weight = weight + l * p * (1 - weight);
			}

			return weight;
		};

		var getClosestWordMatch = function(needleTokens, haystackTokens) {
			var maxMatch = 0;
			var maxMatchesIdx = [];

			for (var i = 0; i < needleTokens.length; ++i) {
				for (var j = 0; j < haystackTokens.length; ++j) {
					var a = needleTokens[i];
					var b = haystackTokens[j];

					var match = getJaroMatch(a, b);

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

		var getFuzzyResult = this.getFuzzyResult = function(needle, haystack) {
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

		this.filter = function(list, include, search) {
			if (!search || search.length < config.minLength) { // catches null, undefined, ''
				return list.slice();
			}

			return list.filter(function(element) {
				return include
					.map(function(key) {
						return getDeepValue(element, key);
					})
					.filter(function(value) {
						return !!value;
					})
					.some(function(value) {
						return getFuzzyResult(search, value).match > config.fuzzyLimit;
					});
			});
		};
	}]);