var routesFactory = angular.module('myapp.factories.routesService', []);
routesFactory.factory('myapp.factories.routesService', function() {
	var baseUrl = 'http://localhost/'
	return {
		"getaccessToken" : baseUrl+"getAuthToken",
		"getAirports" : baseUrl+"getAirports",
		"getFlights" : baseUrl+"getFlights",
		"bookTicket" : baseUrl+"bookTicket",
		"addFlights" : baseUrl+"addFlights"
	}
})
