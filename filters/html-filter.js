app
	.filter('html', ['$sce', function($sce) {
		return function(html) {
			return $sce.trustAsHtml(html);
		};
	}]);