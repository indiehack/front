/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='config/routes.ts' />
/// <reference path='technology/technologyController.ts' />


module demoApp {
    'use strict';

    angular
        .module('hakkaStack', ['ui.router', 'restangular'])
        .config(demoApp.config.routesConfig)
        .config((RestangularProvider : restangular.IProvider) => {
            RestangularProvider.setBaseUrl('http://private-65917-hakkastack.apiary-mock.com');
        })
        .controller('TechnologyController', TechnologyController)
        .service('TechnologyService', TechnologyService)
        .service('ProjectsService', ProjectsService);
}