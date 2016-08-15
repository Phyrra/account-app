app
    .directive('onSwipeRight', ['$parse', '$document', '$timeout', function($parse, $document, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var DEFAULT_EXECUTE_FRACTION = 0.5;
                var MIN_ANIMATION_TIME = 500;

                var executeFraction;
                if ($attrs.hasOwnProperty('executeFraction')) {
                    executeFraction = parseFloat($attrs.executeFraction);
                } else {
                    executeFraction = DEFAULT_EXECUTE_FRACTION;
                }

                var width = $element.parent().width();

                var callback = $parse($attrs.onSwipeRight);

                var running = false;

                var startX;
                var curX;

                var lastTimeStamp;
                var swipeXSpeed;

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

                    if (newX < curX) {
                        $element.css('left', 0);

                        running = false;
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
                        if (curX - startX > width * executeFraction || swipeXSpeed > 1) {
                            var left = $element.position().left;
                            var time = (width - left) / swipeXSpeed;

                            $element.animate({
                                left: width
                            }, {
                                duration: Math.min(time || MIN_ANIMATION_TIME, MIN_ANIMATION_TIME),
                                easing: 'linear',
                                done: function() {
                                    $timeout(function() {
                                        callback($scope);
                                    }, 0);
                                }
                            });
                        } else {
                            $element.css('left', 0);
                        }
                    }

                    running = false;
                });
            }
        }
    }]);