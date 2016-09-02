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
			$('.modal-wrapper')
				.css('opacity', 1)
				.animate({
					opacity: 0
				}, {
					duration: DURATION,
					done: function() {
						$('fullscreen-modal').remove();
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

	.controller('ModalController', ['ModalService', 'MODAL_ANIMATION_DURATION', '$element', function(ModalService, DURATION, $element) {
		var ctrl = this;

		ctrl.onButtonClick = function(button) {
			if (angular.isFunction(button.action)) {
				// TODO: don't know any better way to pass the "content" of the modal
				button.action($element.find('.modal-content'));
			}
		};

		ctrl.$onInit = function() {
			$('.modal-body')
				.css('opacity', 0)
				.animate({
					opacity: 1
				}, {
					duration: DURATION
				});
		};
	}]);