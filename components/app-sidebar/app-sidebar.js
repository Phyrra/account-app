app
    .component('appSidebar', {
        templateUrl: 'components/app-sidebar/app-sidebar.html',
        transclude: true,
        bindings: {
            show: '='
        }
    });