/// <reference path='../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class ProjectsService {

        public static $inject = [
            'Restangular'
        ];

        constructor(private Restangular: restangular.IService) {
        }

        getAllProjects() {
            return this.Restangular.all('projects').getList();
        }

        createProject(project) {
            return this.Restangular.all('projects').post(project);
        }

        updateProject(project) {
            var projectCopy = this.Restangular.copy(project);
            return this.Restangular.one('projects', project.id).put(projectCopy);
        }

        deleteProject(project) {
            return this.Restangular.one('projects', project.id).remove();
        }
    }

}