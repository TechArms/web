/**
 * This file defines the main application module that is loaded in ng-app.
 * - Route configurations and other resuable modules are also defined here
 */

// TODO:: Check how to implement strict mode to create sealed objects
// http://blog.jdriven.com/2012/11/using-ecmascript-5-strict-mode-to-keep-your-angularjs-scope-declaration-clean/
//'use strict';

/**
 * Client-side route configuration for the app
 */
var appConfig = ['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.
    when('/', {
        // controller: 'HomeController',
        templateUrl: '/home.html'
      }).
      when('/development', {
        templateUrl: 'development.html'
      }).
      when('/maintenance', {
        templateUrl: 'maintenance.html'
      }).
      when('/seo', {
        templateUrl: 'seo.html'
      })
      .when('/consultation', {
        templateUrl: 'consultation.html'
      })
      .when('/aboutus', {
        templateUrl: 'about-us.html'
      });
}];



/**
 * Main application module
 * @namespace webApp
 * @desc All application specific controllers, services, directives, etc are defined as part of webApp namespace
 */
var techarms = angular.module('techarms', ['ngRoute']).
    config(appConfig);