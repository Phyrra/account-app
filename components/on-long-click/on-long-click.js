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

                $element.on('mousedown touchstart', function() {
                    eventStart = new Date();

                    eventInterval = $interval(function() {
                        if (new Date() - eventStart > timeDelay) {
                            $timeout(function() {
                                callback($scope);
                            }, 0);

                            $interval.cancel(eventInterval);
                            eventInterval = null;
                        }
                    }, 10);
                });

                $element.on('mouseup touchend mouseout mouseleave', function() {
                    if (eventInterval) {
                        $interval.cancel(eventInterval);
                        eventInterval = null;
                    }
                });
            }
        }
    }]);