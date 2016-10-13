'use strict'
var controller = angular.module('myapp.controller.home', ['ui-rangeSlider']);

controller.controller('myapp.controller.home', ['$scope', '$state','myapp.factories.flightService','myapp.factories.routesService','myapp.factories.httpService','$stateParams',
function ($scope, $state, flightService,routesService,httpService, $stateParams) {
      var self = this;
      self.flightSearch = {};
      var availableAirports = {};
      self.priceRangeBar = {
          min: 20,
          max: 80
      };
      var init = function() {
      	self.airportList = [];
      	self.flightSearch.returnTrip = "true";
        self.fromDate = _formatDate(new Date());
     	_setFlightView();
        availableAirports = flightService.getAvailableAirPorts();
        self.airportList = availableAirports['airPortsList'];
      }

    var _setFlightView = function() {
       var flightInfo = flightService.getFlightInfos();	
       if(flightInfo) {
       	self.travelInfo = flightService.getFlightFromTo();
       	self.flightSearch.travelFrom = self.travelInfo.from;
       	self.flightSearch.travelTo = self.travelInfo.to;
       	self.flightSearch.oneSideDate = new Date(self.travelInfo.fromDate)
       	if(self.travelInfo.toDate) {
	       	self.flightSearch.returnDate = new Date(self.travelInfo.toDate)
       	}
       	if(Array.isArray(flightInfo)) {
       		self.inFlight = flightInfo;
       		self.outFlight = false;
       	} else {
       		self.inFlight = flightInfo['singleJourney'];
       		self.outFlight = flightInfo['returnJourney'];
       	}
       } else {
         $state.go('root.search');
       }
    }
    var _formatDate = function(d) {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
  	self.manageAirPortList = function(suggestion) {
        self.airportList = availableAirports['airPortsList'].slice();
        self.airportList.remove(suggestion)
    }
    self.setReturnDate = function() {
        self.toDate = _formatDate(new Date(self.flightSearch.oneSideDate));
        if(new Date(self.flightSearch.returnDate) < new Date(self.flightSearch.oneSideDate)) {
            self.flightSearch.returnDate = "";
        }
    }
    self.bookTicket = function(flightId, index, myVar) {
    	if(self.userEmail) {
        	httpService.post(routesService.bookTicket,{"flightId":flightId,"emailId":self.userEmail},function(res, status) {
        		if(myVar == "in") {
        			self.inFlight[index].remainingSeats = self.inFlight[index].remainingSeats-1;
        		}
        		alert("Your Ticket booked successfully");
        	})
        } else {
        	alert("Please Enter email Id");
        }
    }
    self.searchFlights = function() {
    	console.log(self.flightSearch);

    	var requestParams = {};
        if(!self.flightSearch.travelFrom) {
            alert("Please select source");
            return false;
        } else if(!self.flightSearch.travelTo) {
            alert("Please select travelTo");
            return false;
        } else if(!self.flightSearch.oneSideDate) {
            alert("Please select travel date");
            return false;
        } else if(self.flightSearch.returnTrip == "true" && !self.flightSearch.returnDate) {
            alert("Please select return date");
            return false;
        } 
        var flightsInfo = availableAirports['oAirportIds'];
        requestParams.travelFrom = flightsInfo[self.flightSearch.travelFrom.trim()];
        requestParams.travelTo = flightsInfo[self.flightSearch.travelTo.trim()];
        requestParams.oneSideDate = new Date(self.flightSearch.oneSideDate).getDay();
        requestParams.noOfPassanges = 5;
        if(self.flightSearch.returnTrip == "true") {
            requestParams.returnDate = new Date(self.flightSearch.returnDate).getDay();
        }
        httpService.post(routesService.getFlights, requestParams,function(res, status) {
          flightService.setFlightFromTo({"from":self.flightSearch.travelFrom,"to":self.flightSearch.travelTo,"fromDate":self.flightSearch.oneSideDate,"toDate":self.flightSearch.returnDate});
          flightService.setFlightInfos(res);
          _setFlightView();
        })

    }

  init();
}]);
