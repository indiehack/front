/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class TechnologyService {

        public static $inject = ['Restangular'];

        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(private Restangular: restangular.IService) {
        }

        getAllTechs() {
            return this.Restangular.all('techs').getList();
        }

    }

}