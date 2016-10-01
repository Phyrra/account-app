app
	.factory('FontAwesome', ['$http', function($http) {
		var service = {};

		service.getIcons = function() {
			return $http({
				method: 'GET',
				url: 'bower_components/font-awesome/css/font-awesome.min.css'
			}).then(function(response) {
				return response.data;
			});
		};

		return service;
	}])

	.factory('FontAwesomeIconService', ['FontAwesome', '$q', function(FontAwesome, $q) {
		var service = {};

		var cache = {};

		service.getIcons = function() {
			if (cache.hasOwnProperty('icons')) {
				return $q.when(cache.icons);
			}

			return FontAwesome.getIcons().then(function(css) {
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

				return results;
			});
		};

		return service;
	}]);