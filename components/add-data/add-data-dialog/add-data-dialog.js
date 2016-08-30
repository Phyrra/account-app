app
	.component('addDataDialog', {
		templateUrl: 'components/add-data/add-data-dialog/add-data-dialog.html',
		controller: 'AddDataDialogController',
		controllerAs: 'addDataCtrl',
		bindings: {
			accountId: '<'
		}
	})

	.controller('AddDataDialogController', ['$element', '$q', 'AccountService', function($element, $q, AccountService) {
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
			var inputMask = $element.find('.expense-input-mask');
			var inputMaskCtrl = inputMask.scope().inputMaskCtrl;

			if (!inputMaskCtrl.categoryId) {
				inputMask.find('.category .dropdown-input').addClass('required');
			}

			if (!inputMaskCtrl.amount) {
				inputMask.find('.amount input').addClass('required');
			}

			if (!inputMaskCtrl.title) {
				inputMask.find('.title input').addClass('required');
			}

			if (inputMaskCtrl.categoryId && inputMaskCtrl.amount && inputMaskCtrl.title && inputMaskCtrl.date) {
				return AccountService.addExpense({
					accountId: ctrl.accountId,
					categoryId: inputMaskCtrl.categoryId,
					title: inputMaskCtrl.title,
					amount: inputMaskCtrl.amount,
					description: inputMaskCtrl.description,
					date: inputMaskCtrl.date
				}).then(function(expense) {
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
			var inputMask = $element.find('.balance-input-mask');
			var inputMaskCtrl = inputMask.scope().inputMaskCtrl;

			if (!inputMaskCtrl.amount) {
				inputMask.find('.amount input').addClass('required');
			}

			if (inputMaskCtrl.amount) {
				return AccountService.addBalance({
					accountId: ctrl.accountId,
					amount: inputMaskCtrl.amount,
					date: inputMaskCtrl.date
				}).then(function(balance) {
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