app
	.service('StringMatcher', [function() {
		// https://rosettacode.org/wiki/Levenshtein_distance#ES5
		var directLevenshtein = function(a, b) {
			var t = [];
			var u;
			var i;
			var j;
			var m = a.length;
			var n = b.length;

			if (!m) {
				return n;
			}

			if (!n) {
				return m;
			}

			for (j = 0; j <= n; ++j) {
				t[j] = j;
			}

			for (i = 1; i <= m; ++i) {
				for (u = [i], j = 1; j <= n; ++j) {
					u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
				}

				t = u;
			}

			return u[n];
		};

		var relativeLevenshtein = function(a, b) {
			return directLevenshtein(a, b) / (a.length + b.length) * 2;
		};

		this.getMatch = function(a, b) {
			return 1 - Math.min(relativeLevenshtein(a, b), 1);
		};
	}]);