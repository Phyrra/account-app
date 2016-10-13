app
	.service('FontAwesome', ['$http', '$q', function($http, $q) {
		var cache = {};

		this.getIcons = function() {
			if (cache.hasOwnProperty('icons')) {
				return $q.when(cache.icons);
			}

			return $http({
				method: 'GET',
				url: 'bower_components/font-awesome/css/font-awesome.min.css'
			}).then(function(response) {
				var css = response.data;

				var regex = /\.fa-(.+?)({|,)/gi;
				var results = [];

				var result;
				while (result = regex.exec(css)) {
					if (result.length > 1) {
						var name = result[1];

						var match = name.match(/(([a-z]|[A-Z]|[0-9]|-|_)+):before/);
						if (match && match.length > 1) {
							results.push(match[1]);
						}
					}
				}

				cache.icons = results;
				return results;
			});
		};
	}]);