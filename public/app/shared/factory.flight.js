var flightServiceFactory = angular.module('myapp.factories.flightService', []);
flightServiceFactory.factory('myapp.factories.flightService',['$state', function($state) {
    
    set = function(key,values){
    	localStorage.setItem(key,values);
    }

    get = function(key) {
    	return localStorage.getItem(key) 
    }

    return {
    	setFlightInfos: function(flightInfo) {
    		set("flightDetails",JSON.stringify(flightInfo));
    	},
        getFlightInfos: function() {
            try{
        	   return JSON.parse(get("flightDetails"));
            } catch(error) {
                return "";
            }
        },
        setFlightFromTo: function(FlightFromTo) {
            set("flightFromTo",JSON.stringify(FlightFromTo));
        },
        getFlightFromTo: function() {
            try{
               return JSON.parse(get("flightFromTo"));
            } catch(error) {
                return "";
            }
        },
        setAvailableAirPorts: function(FlightFromTo) {
            set("availableAirPorts",JSON.stringify(FlightFromTo));
        },
        getAvailableAirPorts: function() {
            try{
               return JSON.parse(get("availableAirPorts"));
            } catch(error) {
                return "";
            }
        },
        setAccessToken: function(accessToken) {
            set("accessToken",accessToken);
        },
        getAccessToken: function() {
            return get("accessToken");
        }
    }
}]);
