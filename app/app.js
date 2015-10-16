'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular.module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .run(function($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  });