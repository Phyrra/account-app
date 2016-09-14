app
	.component('analysisBlock', {
		templateUrl: 'components/analysis-block/analysis-block.html',
		controller: 'AnalysisBlockController',
		controllerAs: 'analysisCtrl',
		bindings: {
			expenses: '<'
		}
	})

	.controller('AnalysisBlockController', ['DataService', '$timeout', '$filter', '$scope', function(DataService, $timeout, $filter, $scope) {
		var ctrl = this;

		ctrl.showContent = false;

		ctrl.filterExpenses = function() {
			ctrl.filteredExpenses = ctrl.expenses
				.filter(function(expense) {
					return expense.date >= ctrl.dateStart && expense.date <= ctrl.dateEnd;
				});
		};

		ctrl.onContentToggle = function() {
			ctrl.showContent = !ctrl.showContent;

			if (ctrl.showContent) {
				if (angular.isUndefined(ctrl.dateStart)) {
					ctrl.dateStart = ctrl.expenses[ctrl.expenses.length - 1].date;
				}

				if (angular.isUndefined(ctrl.dateEnd)) {
					ctrl.dateEnd = ctrl.expenses[0].date;
				}

				ctrl.filterExpenses();
			}
		};
	}]);