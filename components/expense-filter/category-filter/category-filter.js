app
    .component('categoryFilter', {
        templateUrl: 'components/expense-filter/category-filter/category-filter.html',
        controller: 'CategoryFilterController',
        controllerAs: 'categoryFilterCtrl',
        bindings: {
            srcModel: '=',
            dstModel: '='
        }
    })

    .controller('CategoryFilterController', ['DataService', '$scope', function(DataService, $scope) {
        var ctrl = this;

        ctrl.categories = [];

        ctrl.loadCategories = function() {
            DataService.getCategories().then(function(categories) {
                ctrl.categories = categories;

                ctrl.selectAllCategories();
                ctrl.performFilter();
            });
        };

        ctrl.selectAllCategories = function() {
            ctrl.categories.forEach(function(category) {
                category.checked = true;
            });
        };

        ctrl.toggleCategory = function(category) {
            category.checked = !category.checked;

            ctrl.performFilter();
        };

        ctrl.isCategorySelected = function(categoryId) {
            return ctrl.categories
                .filter(function(category) {
                    return category.checked === true && category.id === categoryId;
                }).length > 0;
        };

        ctrl.performFilter = function() {
            ctrl.dstModel = ctrl.srcModel.filter(function(model) {
                return ctrl.isCategorySelected(model.categoryId);
            });
        };

        $scope.$watch('categoryFilterCtrl.srcModel', function(value) {
            ctrl.performFilter();
        });

        ctrl.$onInit = function() {
            ctrl.loadCategories();
        };
    }]);