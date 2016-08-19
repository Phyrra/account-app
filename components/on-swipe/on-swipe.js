app
    .directive('onSwipe', ['$parse', '$document', '$timeout', function($parse, $document, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var DEFAULT_EXECUTE_FRACTION = 0.5;
                var MIN_ANIMATION_TIME = 500;

                var swipeValidator = {
                    'left': function(newX, oldX) {
                        return newX < oldX;
                    },

                    'right': function(newX, oldX) {
                        return newX > oldX;
                    }
                }

                var executeFraction;
                if ($attrs.hasOwnProperty('executeFraction')) {
                    executeFraction = parseFloat($attrs.executeFraction);
                } else {
                    executeFraction = DEFAULT_EXECUTE_FRACTION;
                }

                var width = $element.parent().width();

                var swipeDirection = null;
                if ($attrs.hasOwnProperty('swipeDirection')) {
                    swipeDirection = $attrs.swipeDirection;
                }

                var callback = null;
                if (angular.isDefined($attrs.onSwipe)) {
                    callback = $parse($attrs.onSwipe);
                }

                var running = false;

                var startX;
                var curX;

                var lastTimeStamp;
                var swipeXSpeed;

                var reset = function() {
                    startX = null;
                    curX = null;
                    lastTimeStamp = null;
                    swipeXSpeed = null;

                    running = false;
                }

                $element.on('mousedown touchstart', function(event) {
                    event.preventDefault();

                    running = true;
                    startX = event.clientX;
                    curX = Number.MIN_VALUE;
                });

                $element.on('mousemove touchmove', function(event) {
                    event.preventDefault();

                    var newX = event.clientX;
                    var timeStamp = event.timeStamp;

                    if (angular.isFunction(swipeValidator[swipeDirection])) {
                        if (!swipeValidator[swipeDirection](newX, curX)) {
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
                                    if (angular.isFunction(callback)) {
                                        $timeout(function() {
                                            callback($scope);
                                        }, 0);
                                    }
                                }
                            });
                        } else {
                            $element.css('left', '');
                        }
                    }

                    reset();
                });
            }
        }
    }]);