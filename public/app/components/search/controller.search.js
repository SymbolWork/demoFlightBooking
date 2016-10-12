var controller = angular.module('myapp.controller.search', ['autocomplete']);

controller.controller('myapp.controller.search', ['$scope','$state','myapp.factories.flightService','myapp.factories.routesService','myapp.factories.httpService',
function searchCtl($scope, $state, flightService,routesService,httpService) {
    var self = this;
    self.from = '';
    self.serachForm = {};
    self.airportList = [];
    var airportInfo;
    var init = function() {
        self.activeRoundTrip = true;
        self.fromDate = _formatDate(new Date());
        httpService.get(routesService.getAirports, function(res, status) {
          self.airportList = res['airPortsList'];
          airportInfo = res;
          flightService.setAvailableAirPorts(res);
        })
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
        self.airportList = airportInfo['airPortsList'].slice();
        self.airportList.remove(suggestion)
    }

    self.setReturnDate = function() {
        self.toDate = _formatDate(new Date(self.serachForm.oneSideDate));
        if(new Date(self.serachForm.returnDate) < new Date(self.serachForm.oneSideDate)) {
            self.serachForm.returnDate = "";
        }
    }

    self.searchFlights = function() {
        var requestParams = {};
        if(!self.serachForm.travelFrom) {
            alert("Please select source");
            return false;
        } else if(!self.serachForm.travelTo) {
            alert("Please select travelTo");
            return false;
        } else if(!self.serachForm.oneSideDate) {
            alert("Please select travel date");
            return false;
        } else if(self.activeRoundTrip && !self.serachForm.returnDate) {
            alert("Please select return date");
            return false;
        } else if(!self.serachForm.noOfPassanges) {
            alert("Please enter valid number of passengers")
            return false;
        }
        var flightsInfo = airportInfo['oAirportIds'];
        requestParams.travelFrom = flightsInfo[self.serachForm.travelFrom.trim()];
        requestParams.travelTo = flightsInfo[self.serachForm.travelTo.trim()];
        requestParams.oneSideDate = new Date(self.serachForm.oneSideDate).getDay();
        requestParams.noOfPassanges = self.serachForm.noOfPassanges;
        if(self.activeRoundTrip) {
            requestParams.returnDate = new Date(self.serachForm.returnDate).getDay();
        }
        httpService.post(routesService.getFlights, requestParams,function(res, status) {
          flightService.setFlightFromTo({"from":self.serachForm.travelFrom,"to":self.serachForm.travelTo,"fromDate":self.serachForm.oneSideDate,"toDate":self.serachForm.returnDate});
          flightService.setFlightInfos(res);
          $state.go('root.home');
        })
    }
    

  init();
}]);
