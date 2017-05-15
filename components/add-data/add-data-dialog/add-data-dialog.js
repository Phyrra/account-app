app
	.component('addDataDialog', {
		templateUrl: 'components/add-data/add-data-dialog/add-data-dialog.html',
		controller: 'AddDataDialogController',
		controllerAs: 'addDataCtrl',
		bindings: {
			accountId: '<'
		}
	})

	.controller('AddDataDialogController', ['$element', '$q', function($element, $q) {
		var ctrl = this;

		ctrl.tabs = [{
			value: 1,
			text: 'Expense'
		}, {
			value: 2,
			text: 'Balance'
		}];

		ctrl.selectedTab = null;

		ctrl.onSaveExpense = function() {
			var inputMaskCtrl = $element.find('.expense-input-mask').scope().inputMaskCtrl;

			if (inputMaskCtrl.validate()) {
				return inputMaskCtrl.onCreate(ctrl.accountId).then(function(expense) {
					return {
						success: true,
						field: 'expenses',
						id: expense.id
					};
				});
			} else {
				return $q.resolve({
					success: false
				});
			}
		};

		ctrl.onSaveBalance = function() {
			var inputMaskCtrl = $element.find('.balance-input-mask').scope().inputMaskCtrl;

			if (inputMaskCtrl.validate()) {
				return inputMaskCtrl.onCreate(ctrl.accountId).then(function(balance) {
					return {
						success: true,
						field: 'balances',
						id: balance.id
					};
				});
			} else {
				return $q.resolve({
					success: false
				});
			}
		};

		ctrl.onClickSave = function() {
			switch (ctrl.selectedTab) {
				case 1:
					return ctrl.onSaveExpense();
				case 2:
					return ctrl.onSaveBalance();
			}
		};
	}]);