app
	.constant('FOLDOUT_ANIMATION_DURATION', 500)

	.animation('.foldout-animation', ['FOLDOUT_ANIMATION_DURATION', function(DURATION) {
		var getAnimationTarget = function(element) {
			var attr = element.attr('target-height');

			if (angular.isDefined(attr)) {
				return {
					property: 'max-height',
					value: parseInt(attr, 10)
				};
			}

			return {
				property: 'height',
				value: element.height()
			};
		};

		var getDuration = function(element) {
			var attr = element.attr('animation-time');

			if (angular.isDefined(attr)) {
				return parseInt(attr, 10);
			}

			return DURATION;
		};

		var enter = function(element, done) {
		    var target = getAnimationTarget(element);

			element.css(target.property, 0);
			element.css('overflow-y', 'hidden');

			var animationTarget = {};
			animationTarget[target.property] = target.value;

			element.animate(animationTarget,
			{
				duration: getDuration(element),
				done: function() {
					element.css(target.property, '');
					element.css('overflow-y', '');

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
				duration: getDuration(element),
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