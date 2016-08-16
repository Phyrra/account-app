app
	.component('balanceBlock', {
		templateUrl: 'components/balance-block/balance-block.html',
		transclude: true,
		controller: 'BalanceBlockController',
		controllerAs: 'blockCtrl',
		bindings: {
			model: '=ngModel',
			openOnInit: '<'
		}
	})

	.controller('BalanceBlockController', [function() {
		var ctrl = this;

		ctrl.showContent = ctrl.openOnInit === true;

		ctrl.onContentToggle = function() {
			ctrl.showContent = !ctrl.showContent;
		};
	}]);