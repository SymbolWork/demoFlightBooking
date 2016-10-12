'use strict'
var controller = angular.module('myapp.controller.admin', []);

controller.controller('myapp.controller.admin', ['$scope', '$state','myapp.factories.flightService','myapp.factories.routesService','myapp.factories.httpService','$stateParams',
function ($scope, $state, flightService,routesService,httpService, $stateParams) {
      var self = this;
      self.addFligthForm = {};
      var availableAirports = {};
      var init = function() {
      	availableAirports = flightService.getAvailableAirPorts();
        if(availableAirports) {
           httpService.get(routesService.getAirports, function(res, status) {
            self.airportList = res['airPortsList'];
            availableAirports = res;
            flightService.setAvailableAirPorts(res);
          })
         } else {
            self.airportList = availableAirports['airPortsList'];
         }
      }

      self.manageAirPortList = function(suggestion) {
        self.airportList = availableAirports['airPortsList'].slice();
        self.airportList.remove(suggestion)
      }

      self.addFlight = function(){
        var requestObj = {};
        var flightsInfo = availableAirports['oAirportIds'];
        requestObj.travelFrom = flightsInfo[self.addFligthForm.travelFrom.trim()];
        requestObj.travelTo = flightsInfo[self.addFligthForm.travelTo.trim()];
        var arriveTime = self.addFligthForm.arriveTime;
        requestObj.arriveTime = arriveTime.getHours()+":"+arriveTime.getMinutes()+":"+arriveTime.getSeconds(); 
        var departTime = self.addFligthForm.departTime;
        requestObj.departTime = departTime.getHours()+":"+departTime.getMinutes()+":"+departTime.getSeconds(); 
        requestObj.airline = self.addFligthForm.airline;
        requestObj.price = self.addFligthForm.price;
        requestObj.totalSeats = self.addFligthForm.totalSeats;
        requestObj.weekSchedule = self.addFligthForm.weekSchedule;

        httpService.post(routesService.addFlights, requestObj,function(res, status) {
         alert("added successfully");
        })
      }

  init();
}]);
