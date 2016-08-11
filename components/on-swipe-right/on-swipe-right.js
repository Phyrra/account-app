app
    .directive('onSwipeRight', ['$parse', '$document', '$timeout', function($parse, $document, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var DEFAULT_EXECUTE_FRACTION = 0.66;

                var executeFraction;
                if ($attrs.hasOwnProperty('executeFraction')) {
                    executeFraction = parseFloat($attrs.executeFraction);
                } else {
                    executeFraction = DEFAULT_EXECUTE_FRACTION;
                }

                var width = $element.width();

                var callback = $parse($attrs.onSwipeRight);

                var running = false;

                var startX;
                var curX;

                $element.on('mousedown touchstart', function(event) {
                    running = true;
                    startX = event.clientX;
                    curX = Number.MIN_VALUE;
                });

                $element.on('mousemove touchmove', function() {
                    var newX = event.clientX;

                    if (newX < curX) {
                        $element.css('left', 0);

                        running = false;
                    }

                    if (running) {
                        curX = newX;

                        $element.css('left', curX - startX);
                    }
                });

                $document.on('mouseup touchend', function() {
                    if (running && curX - startX > width * executeFraction) {
                        $timeout(function() {
                            callback($scope);
                        }, 0);
                    } else {
                        $element.css('left', 0);
                    }

                    running = false;
                });
            }
        }
    }]);