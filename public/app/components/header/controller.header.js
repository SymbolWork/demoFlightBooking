'use strict'
var controller = angular.module('myapp.controller.header', []);

controller.controller('myapp.controller.header', ['$scope', '$state','myapp.factories.flightService','myapp.factories.routesService','myapp.factories.httpService','$stateParams',
function ($scope, $state, flightService,routesService,httpService, $stateParams) {
      var self = this;
      var init = function() {
       
      }

  

  init();
}]);
