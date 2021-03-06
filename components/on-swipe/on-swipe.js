app
	.constant('SWIPE_DIRECTION', {
		LEFT: 'left',
		RIGHT: 'right'
	})

	.directive('onSwipe', ['$parse', '$document', '$timeout', 'SWIPE_DIRECTION', function($parse, $document, $timeout, SWIPE_DIRECTION) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attrs) {
				var DEFAULT_EXECUTE_FRACTION = 0.5;
				var MIN_ANIMATION_TIME = 500;
				var Y_TOLERANCE_MIN = 32;
				var Y_TOLERANCE_FACTOR = 0.75;

				var swipeValidator = {
					'left': function(newX, oldX) {
						return newX <= oldX;
					},

					'right': function(newX, oldX) {
						return newX >= oldX;
					}
				};

				var executeFraction;
				if ($attrs.hasOwnProperty('executeFraction')) {
					executeFraction = parseFloat($attrs.executeFraction);
				} else {
					executeFraction = DEFAULT_EXECUTE_FRACTION;
				}

				var width = null;

				var swipeDirection = null;
				if ($attrs.hasOwnProperty('swipeDirection')) {
					swipeDirection = $attrs.swipeDirection;
				}

				var callback = null;
				if (angular.isDefined($attrs.onSwipe)) {
					callback = $parse($attrs.onSwipe);
				} else {
					callback = angular.noop;
				}

				var running = false;

				var startX;
				var startY;
				var curX;

				var lastTimeStamp;
				var swipeXSpeed;

				var reset = function() {
					startX = null;
					startY = null;
					curX = null;
					lastTimeStamp = null;
					swipeXSpeed = null;

					running = false;
				};

				$element.on('mousedown touchstart', function(event) {
					event.preventDefault();

					running = true;
					startX = event.clientX || event.originalEvent.touches[0].clientX;
					startY = event.clientY || event.originalEvent.touches[0].clientY;
					curX = startX;

					width = $element.parent().width();
				});

				$element.on('mousemove touchmove', function(event) {
					event.preventDefault();

					if (running) {
						var newX = event.clientX || event.originalEvent.touches[0].clientX;
						var newY = event.clientY || event.originalEvent.touches[0].clientY;

						var timeStamp = event.timeStamp;

						var doReset = false;

						if (angular.isFunction(swipeValidator[swipeDirection])) {
							if (!swipeValidator[swipeDirection](newX, curX)) {
								doReset = true;
							}
						}

						if (Math.abs(startY - newY) > Math.max(Y_TOLERANCE_MIN, Math.abs(startX - newX) * Y_TOLERANCE_FACTOR)) {
							doReset = true;
						}

						if (doReset) {
							$element.css('left', '');

							reset();
						}
					}

					if (running) {
						swipeXSpeed = (newX - curX) / (timeStamp - lastTimeStamp);
						curX = newX;

						lastTimeStamp = timeStamp;

						$element.css('left', curX - startX);
					}
				});

				$document.on('mouseup touchend', function() {
					if (running) {
						if (Math.abs(curX - startX) > width * executeFraction || Math.abs(swipeXSpeed) > 1) {
							var left = $element.position().left;
							var time = Math.abs((width - left) / swipeXSpeed);

							$element.animate({
								left: Math.sign(swipeXSpeed) * width
							}, {
								duration: Math.min(time || MIN_ANIMATION_TIME, MIN_ANIMATION_TIME),
								easing: 'linear',
								done: function() {
									$timeout(function() {
										callback(
											$scope,
											{
												direction: left > 0 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT
											}
										);
									}, 0);

									$element.css('left', '');
								}
							});
						} else {
							$element.css('left', '');
						}
					}

					reset();
				});
			}
		};
	}]);