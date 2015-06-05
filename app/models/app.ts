/// <reference path='../typings/angular/angular.d.ts' />
/// <reference path='controller.ts' />

module demoApp {
    'use strict';

    angular
        .module('demo-app', [])
        .controller('DemoController', DemoController);
}