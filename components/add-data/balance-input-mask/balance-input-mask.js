app
	.component('balanceInputMask', {
		templateUrl: 'components/add-data/balance-input-mask/balance-input-mask.html',
		controller: 'BalanceInputMaskController',
		controllerAs: 'inputMaskCtrl'
	})

	.controller('BalanceInputMaskController', ['$scope', '$filter', function($scope, $filter) {
		var ctrl = this;

		ctrl.categories = [];

		$scope.$watch('balanceMaskCtrl.date', function(value) {
			if (value) {
				ctrl.dateModel = $filter('date')(value);
			}
		});
	}]);