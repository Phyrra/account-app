app
	.directive('bindValue', ['$parse', function($parse) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attrs) {
				var watcher = $scope.$watch(function() { // gets called every digest cycle
					$parse($attrs.bindValue)($scope);
				});
			}
		};
	}]);