'use strict';

let oFlightModel;
let join;
class FlightController {

	constructor(flightmodel,mailsettings,commonSettings) {
		oFlightModel = flightmodel;
    join = commonSettings.getPromise().join;
   
	}

  getAirports(req, res) {
    oFlightModel.getAirports().then(function(data) {
      let i;
      let dLength = data.length;
      let ids = {};
      let airports = [];
      for(i = 0; i < dLength; i++) {
        let airKey = data[i].name+', '+data[i].city+' ('+data[i].code+')';
        ids[airKey] = data[i].id;
        airports.push(airKey);
      }
      res.send({"airPortsList":airports,"oAirportIds":ids});
    });
  }
  
  getFlights(req, res) {
    let travelInfo = {"travelFrom":req.body.travelFrom,"travelTo":req.body.travelTo,"travelDay":req.body.oneSideDate};
    if(req.body.returnDate) {
      let travelOne = oFlightModel.getFlights(travelInfo);
      travelInfo = {"travelFrom":req.body.travelTo,"travelTo":req.body.travelFrom,"travelDay":req.body.returnDate};
      let travelReturn = oFlightModel.getFlights(travelInfo);
      join(travelOne,travelReturn, function(singleInfo,returnInfo) {
        let response = {};
        response["singleJourney"] = singleInfo;
        response["returnJourney"] = returnInfo;
        res.send(response);
      })
    } else {
      oFlightModel.getFlights(travelInfo).then(function(data) {
        res.send(data);
      })
    }
  }

  bookTicket(req, res) {
      oFlightModel.bookTicket(req.body.emailId,req.body.flightId).then(function(data) {
        res.send({"response":"success"});
      })

  }

  addFlights(req,res) {
    let fligthObj = [req.body.travelFrom,req.body.travelTo,req.body.departTime,req.body.arriveTime,req.body.weekSchedule,req.body.price,req.body.airline,req.body.totalSeats];
     oFlightModel.addFlights(fligthObj).then(function(data) {
        res.send({"response":"success"});
      })
  }
  
}

module.exports = FlightController;
