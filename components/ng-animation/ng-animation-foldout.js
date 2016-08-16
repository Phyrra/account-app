app
	.constant('FOLDOUT_ANIMATION_DURATION', 500)

	.animation('.foldout-animation', ['FOLDOUT_ANIMATION_DURATION', function(DURATION) {
		var enter = function(element, done) {
			var targetHeight = element.height();
			element.css('height', 0);

			element.animate({
				height: targetHeight
			}, {
				duration: DURATION,
				done: function() {
					element.css('height', '');
					done();
				}
			});
		};

		var leave = function(element, done) {
			var initialHeight = element.height();
			element.css('height', initialHeight);

			element.animate({
				height: 0
			}, {
				duration: DURATION,
				done: function() {
					element.css('height', '');
					done();
				}
			});
		};

		return {
			/*
			ng-if
			*/
			enter: enter,
			leave: leave,

			/*
			ng-show
			*/
			beforeRemoveClass: function(element, cls, done) {
				enter(element, done);
			},
			beforeAddClass: function(element, cls, done) {
				leave(element, done);
			}
		}
	}]);