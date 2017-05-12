app
	.component('expenseInputMask', {
		templateUrl: 'components/add-data/expense-input-mask/expense-input-mask.html',
		controller: 'ExpenseInputMaskController',
		controllerAs: 'inputMaskCtrl',
		bindings: {
			model: '<?ngModel'
		}
	})

	.controller('ExpenseInputMaskController', ['DataService', 'AccountService', '$element', function(DataService, AccountService, $element) {
		var ctrl = this;

		ctrl.categories = [];

		ctrl.validate = function() {
			if (!ctrl.categoryId) {
				$element.find('.category .dropdown-input').addClass('required');
			}

			if (!ctrl.amount) {
				$element.find('.amount input').addClass('required');
			}

			if (!ctrl.title) {
				$element.find('.title input').addClass('required');
			}
		};

		ctrl.onCreate = function(accountId) {
			return AccountService.addExpense({
				accountId: accountId,
				categoryId: ctrl.categoryId,
				title: ctrl.title,
				amount: ctrl.amount,
				description: ctrl.description,
				tags: ctrl.tags,
				date: ctrl.date
			});
		};

		ctrl.onUpdate = function() {
			return AccountService.updateExpense({
				id: ctrl.model.id,
				accountId: ctrl.model.accountId,
				categoryId : ctrl.categoryId,
				title: ctrl.title,
				amount: ctrl.amount,
				description: ctrl.description,
				tags: ctrl.tags,
				date: ctrl.date
			});
		};

		ctrl.$onInit = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories.map(function(category) {
					return {
						value: category.id,
						text: category.name
					};
				});
			});

			if (angular.isDefined(ctrl.model)) {
				ctrl.categoryId = ctrl.model.categoryId;
				ctrl.title = ctrl.model.title;
				ctrl.amount = ctrl.model.amount;
				ctrl.description = ctrl.model.description;
				ctrl.tags = ctrl.model.tags;
				ctrl.date = ctrl.model.date;
			}
		};
	}]);