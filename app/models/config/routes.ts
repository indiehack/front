/// <reference path='../../typings/angular-ui-router/angular-ui-router.d.ts' />

module demoApp.config {

    export function routesConfig($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            template: '<b>Home</b>'
        }).state('test', {
            url: '/test',
            templateUrl: 'template/demo.html',
            controller: 'TechnologyController'
        });

    }

}