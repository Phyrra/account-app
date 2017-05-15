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
		    var valid = true;

			if (!ctrl.category) {
				$element.find('.category .dropdown-input').addClass('required');

				valid = false;
			}

			if (!ctrl.amount) {
				$element.find('.amount input').addClass('required');

				valid = false;
			}

			if (!ctrl.title) {
				$element.find('.title input').addClass('required');

				valid = false;
			}

			return valid;
		};

		ctrl.onCreate = function(accountId) {
			return AccountService.addExpense({
				accountId: accountId,
				categoryId: ctrl.category.id,
				title: ctrl.title,
				amount: ctrl.amount,
				description: ctrl.description,
				date: ctrl.date
			});
		};

		ctrl.onUpdate = function() {
			return AccountService.updateExpense({
				id: ctrl.model.id,
				accountId: ctrl.model.accountId,
				categoryId : ctrl.category.id,
				title: ctrl.title,
				amount: ctrl.amount,
				description: ctrl.description,
				date: ctrl.date
			});
		};

		ctrl.renderCategory = function(category) {
            return  '<span class="expense-input-category-option">' +
                        (category.icon ? '<i class="fa fa-' + category.icon + '"></i>' : '')+
                        category.name +
                    '</span>';
		};

		ctrl.$onInit = function() {
			DataService.getCategories().then(function(categories) {
				ctrl.categories = categories;

				if (angular.isDefined(ctrl.model)) {
				    ctrl.categories.some(function(category) {
				        if (category.id === ctrl.model.categoryId) {
				            ctrl.category = category;

				            return true;
				        }

				        return false;
				    });
				}
			});

			if (angular.isDefined(ctrl.model)) {
				ctrl.title = ctrl.model.title;
				ctrl.amount = ctrl.model.amount;
				ctrl.description = ctrl.model.description;
				ctrl.date = ctrl.model.date;
			}
		};
	}]);