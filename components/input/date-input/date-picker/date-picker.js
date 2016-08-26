app
    .component('datePicker', {
        templateUrl: 'components/input/date-input/date-picker/date-picker.html',
        transclude: true,
        controller: 'DatePickerController',
        controllerAs: 'dateCtrl',
        bindings: {
            model: '=?ngModel'
        }
    })

    .controller('DatePickerController', ['SWIPE_DIRECTION', function(SWIPE_DIRECTION) {
        var ctrl = this;

        ctrl.month = null;
        ctrl.year = null;

        ctrl.previousMonth = null;
        ctrl.nextMonth = null;

        ctrl.monthNames = [
            'January',
            'February',
            'March',
            'April',
            'Mai',
            'June',
            'Juli',
            'August',
            'September',
            'Octobre',
            'Novembre',
            'Decembre'
        ];

        ctrl.getDay = function(date) {
            return date.getDate();
        };

        ctrl.getMonth = function(date) {
            return date.getMonth() + 1;
        };

        ctrl.getYear = function(date) {
            return date.getFullYear();
        };

        ctrl.onPreviousMonth = function() {
            ctrl.month -= 1;

            if (ctrl.month < 1) {
                ctrl.month = 12;
                ctrl.year -= 1;
            }

            ctrl.evalSiblingMonths();
        };

        ctrl.onNextMonth = function() {
            ctrl.month += 1;

            if (ctrl.month > 12) {
                ctrl.month = 1;
                ctrl.year += 1;
            }

            ctrl.evalSiblingMonths();
        };

        ctrl.onPreviousYear = function() {
            ctrl.year -= 1;

            ctrl.evalSiblingMonths();
        };

        ctrl.onNextYear = function() {
            ctrl.year += 1;

            ctrl.evalSiblingMonths();
        };

        ctrl.evalSiblingMonths = function() {
            if (ctrl.month === 1) {
                ctrl.previousMonth = {
                    month: 12,
                    year: ctrl.year - 1
                };

                ctrl.nextMonth = {
                    month: 2,
                    year: ctrl.year
                };
            } else if (ctrl.month === 12) {
                ctrl.previousMonth = {
                    month: 11,
                    year: ctrl.year
                };

                ctrl.nextMonth = {
                    month: 1,
                    year: ctrl.year + 1
                };
            } else {
                ctrl.previousMonth = {
                    month: ctrl.month - 1,
                    year: ctrl.year
                };

                ctrl.nextMonth = {
                    month: ctrl.month + 1,
                    year: ctrl.year
                }
            }
        };

        ctrl.onSwipeMonth = function(direction) {
            switch (direction) {
                case SWIPE_DIRECTION.RIGHT:
                    console.log('right');
                    ctrl.onPreviousMonth();
                    break;
                case SWIPE_DIRECTION.LEFT:
                    console.log('left');
                    ctrl.onNextMonth();
                    break;
            }
        };

        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.model)) {
                ctrl.model = new Date();
            }

            ctrl.month = ctrl.getMonth(ctrl.model);
            ctrl.year = ctrl.getYear(ctrl.model);

            ctrl.evalSiblingMonths();
        };
    }]);