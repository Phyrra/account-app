app
	.component('addCategoryButton', {
		templateUrl: 'components/expense-filter/add-category-button/add-category-button.html',
		controller: 'AddCategoryButtonController',
		controllerAs: 'buttonCtrl',
		require: {
			categoryFilterCtrl: '^categoryFilter' // CategoryFilterController
		}
	})

	.controller('AddCategoryButtonController', ['$element','$timeout', '$scope', 'DataService', function($element, $timeout, $scope, DataService) {
		var ctrl = this;

		ctrl.isOpen = false;

		ctrl.onFocusSelect = function() {
			$element.find('.add-button-input')
				.select();
		};

		ctrl.onBlurClose = function() {
			ctrl.isOpen = false;
		};

		ctrl.onClickPlus = function() {
			if (ctrl.isOpen) {
				if (ctrl.name.length > 0) {
					DataService.addCategory(ctrl.name).then(function(category) {
						ctrl.categoryFilterCtrl.addCategory(category);

						ctrl.name = '';
					});
				}

				ctrl.isOpen = false;
			} else {
				ctrl.isOpen = true;

				$timeout(function() {
					$element.find('.add-button-input')
						.focus();
				}, 0, false);
			}
		};

		$scope.$on('document-click', function($event, event) {
			var $target = $(event.target);

            if (!$target.isOrChildOf('add-category-button')) {
            	$timeout(function() {
            		ctrl.onBlurClose();
            	}, 0);
            }
		});
	}])

	.animation('.add-button-input', ['FOLDOUT_ANIMATION_DURATION', function() {
		var DURATION = 500;
		var TARGET_WIDTH = 150;

		return {
			enter: function(element, done) {
				element
					.css('width', 0)
					.animate({
						width: TARGET_WIDTH
					}, {
						duration: DURATION,
						done: done
					});
			},

			leave: function(element, done) {
				element
					.animate({
						width: 0
					}, {
						duration: DURATION,
						done: done
					});
			}
		}
	}]);