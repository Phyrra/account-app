app
	.constant('MODAL_ANIMATION_DURATION', 500)

	.service('ModalService', ['$compile', '$rootScope', '$document', 'MODAL_ANIMATION_DURATION', function($compile, $rootScope, $document, DURATION) {
		var service = {};

		service.open = function(options) {
			var $scope = $rootScope.$new();
			Object.assign($scope, options);
			delete $scope.content;

			var base = $('<fullscreen-modal header="{{header}}" buttons="buttons"></fullscreen-modal>')
				.append(options.content);

			var $element = $compile(base)($scope);

			$document
				.find('body')
				.append($element);
		};

		service.close = function() {
			var $element = $('fullscreen-modal');

			// FIXME: this animaiton is a clusterfuck
			$element
				.find('.modal-backdrop')
				.removeClass('modal-enter')
				.addClass('modal-leave')
				.animate({
					opacity: 0
				}, {
					duration: DURATION,
					done: function() {
						$element.remove();
					}
				});
		};

		return service;
	}])

	.component('fullscreenModal', {
		templateUrl: 'components/fullscreen-modal/fullscreen-modal.html',
		transclude: true,
		controller: 'ModalController',
		controllerAs: 'modalCtrl',
		bindings: {
			header: '@',
			buttons: '<?'
		}
	})

	.controller('ModalController', ['ModalService', 'MODAL_ANIMATION_DURATION', '$timeout', function(ModalService, DURATION, $timeout) {
		var ctrl = this;

		ctrl.$onInit = function() {
			// FIXME: this animation stuff is all kinda broken
			$timeout(function() {
				$('.modal-backdrop').addClass('modal-enter');
			}, 0, false);
		};
	}]);