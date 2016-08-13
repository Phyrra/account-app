app
    .constant('FILTER_ANIMATION_DURATION', 500)

    .animation('.expense-filter', ['FILTER_ANIMATION_DURATION', function(DURATION) {
        return {
            beforeRemoveClass: function(element, cls, done) {
                var targetHeight = element.height();
                element.css('height', 0);

                $(element).animate({
                    height: targetHeight
                }, {
                    duration: DURATION,
                    done: function() {
                        element.css('height', '');
                        done();
                    }
                });
            },
            beforeAddClass: function(element, cls, done) {
                var initialHeight = element.height();
                element.css('height', initialHeight);

                $(element).animate({
                    height: 0
                }, {
                    duration: DURATION,
                    done: function() {
                        element.css('height', '');
                        done();
                    }
                });
            }
        } 
    }]);