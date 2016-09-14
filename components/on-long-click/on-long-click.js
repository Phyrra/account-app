app
	.directive('onLongClick', ['$parse', '$interval', '$timeout', function($parse, $interval, $timeout) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attrs) {
				var DEFAULT_TIME_DELAY = 1000;

				var timeDelay;
				if ($attrs.hasOwnProperty('timeDelay')) {
					timeDelay = parseInt($attrs.timeDelay, 10);
				} else {
					timeDelay = DEFAULT_TIME_DELAY;
				}

				var callback = $parse($attrs.onLongClick);

				var eventStart = null;
				var eventInterval = null;

				var startX;
				var startY;

				var reset = function() {
					$interval.cancel(eventInterval);
					eventInterval = null;
				};

				$element.on('mousedown touchstart', function(event) {
					event.preventDefault();

					eventStart = new Date();
					startX = event.clientX || event.originalEvent.touches[0].clientX;
					startY = event.clientY || event.originalEvent.touches[0].clientY;

					if (!eventInterval) {
						eventInterval = $interval(function() {
							if (new Date().getTime() - eventStart.getTime() > timeDelay) {
								$timeout(function() {
									callback($scope);
								}, 0);

								reset();
							}
						}, 10);
					}
				});

				$element.on('mousemove touchmove', function(event) {
					var newX = event.clientX || event.originalEvent.touches[0].clientX;
					var newY = event.clientY || event.originalEvent.touches[0].clientY;

					if (Math.abs(newX - startX) > 10 || Math.abs(newY - startY) > 10) {
						if (eventInterval) {
							reset();
						}
					}
				});

				$element.on('mouseup touchend mouseout mouseleave', function() {
					if (eventInterval) {
						reset();
					}
				});
			}
		};
	}]);