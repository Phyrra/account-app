app
	.component('datePickerTable', {
		templateUrl: 'components/input/date-input/date-picker/date-picker-table/date-picker-table.html',
		controller: 'DatePickerTableController',
		controllerAs: 'tableCtrl',
		require: {
			dateCtrl: '^^datePicker' // DatePickerController
		},
		bindings: {
			year: '<',
			month: '<',
			model: '=?ngModel'
		}
	})

	.controller('DatePickerTableController', [function() {
		var ctrl = this;

		ctrl.calendarWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

		ctrl.calendarMonth = [
			//  1  2  3  4  5  6  7
			//  8  9 10 11 12 13 14
			// 15 16 17 18 19 20 21
			// 22 23 24 25 26 27 28
			//  x  x  x  x  x  x  x

			//  x  x  x  x  x  x  1
			//  2  3  4  5  6  7  8
			//  9 10 11 12 13 14 15
			// 16 17 18 19 20 21 22
			// 23 24 25 26 27 28 29
			// 30 31

			0, 1, 2, 3, 4, 5
		];

		ctrl.getWeekDay = function(date) {
			return (date.getDay() - 1 + 7) % 7;
		};

		ctrl.getLastOfMonth = function(year, month) { // month 1 based
			if (month === 12) {
				return new Date(year + 1, 0, 0).getDate();
			}

			return new Date(year, month, 0).getDate();
		};

		ctrl.hasRowDays = function(year, month, row) {
			return ctrl.calendarWeek.some(function(day, idx) {
				var date = ctrl.getDate(year, month, row, idx);

				return !date.isNextMonth;
			});
		};

		ctrl.isSelected = function(date) {
			return ctrl.model.getFullYear() === date.getFullYear() &&
				ctrl.model.getMonth() === date.getMonth() &&
				ctrl.model.getDate() === date.getDate();
		};

		ctrl.getDate = function(year, month, row, col) { // month 1 based
			var firstOfMonth = new Date(year, month - 1, 1);
			var firstOfMonthWeekDay = ctrl.getWeekDay(firstOfMonth);

			var lastOfMonth = ctrl.getLastOfMonth(year, month);

			var day = row * 7 - firstOfMonthWeekDay + col + 1;

			var date = new Date(year, month - 1, day);

			var result = {
				date: date
			};

			if (day <= 0) {
				result.isPreviousMonth = true;
			}

			if (day > lastOfMonth) {
				result.isNextMonth = true;
			}

			if (ctrl.isSelected(date)) {
				result.isSelected = true;
			}

			return result;
		};

		ctrl.onDateSelected = function(date) {
			ctrl.model = date;
		};

		ctrl.$onChanges = function(changes) {
		    ctrl.calendarMonth = ctrl.calendarMonth.slice(); // create a clone to give it a new id, to force a re-rendering
		};

		ctrl.$onInit = function() {
			if (angular.isUndefined(ctrl.model)) {
				ctrl.model = new Date();
			}
		};
	}]);