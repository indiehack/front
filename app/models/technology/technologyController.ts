/// <reference path='technologyService.ts' />


module demoApp {
    'use strict';

    export interface MyScope extends ng.IScope {
        technologies: Array<any>;
    }

    export class TechnologyController {

        public static $inject = ['$scope', 'TechnologyService'];

        constructor(private $scope: MyScope, private techsService: TechnologyService) {
            techsService.getAllTechs().then((techs) => {
                $scope.technologies = techs;
            });
        }

    }

}