'use strict';

let oInteractor;
let oCommonsettings;
class UsersModel {

  constructor(interactor,commonsettings) {
    oInteractor = interactor;
    oCommonsettings = commonsettings;
   }

   getAirports(userId) {
    return oInteractor.find("flight_mgmnt","airports",["id","city","name","code"]);
   }

   getFlights(flightObj) {
    return oInteractor.find("flight_mgmnt","flights",["id","travel_from","travel_to","depart","arrive","routine","price","airlines","(total_seats-(select count(*) from booking_info where flight_id =flights.id)) as remainingSeats"],"where travel_from=? and travel_to=? and routine like '%"+flightObj.travelDay+"%'" ,[flightObj.travelFrom,flightObj.travelTo]);
   }

   bookTicket(emailId, flightId) {
        return oInteractor.save('flight_mgmnt','booking_info',["user_email","flight_id","booking_time"],[emailId,flightId,new Date()]); 
   }

 }

module.exports = UsersModel;
