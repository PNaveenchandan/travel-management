const express = require('express');
const db = require("../db-connection/connection")
const uuid = require("uuid");
var moment = require('moment'); // require

const bookingRoute = new express.Router();

bookingRoute.get("/booking", async (request, response) => {
    try {
      const result = await db("BOOKINGS").where("user_id",request.query.user_id);
      console.log(result);
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from BOOKING TABLE!");
    }
  });


  bookingRoute.post("/booking", async (request, response) => {
    try {
      console.log(request.body);
      const user = await db("BOOKINGS").insert(request.body);
      response.send("user BOOKED successfully! and uuid is ");
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to create user!"+e);
    }
  });

  bookingRoute.patch("/booking", async (request, response) => {
    try {
      const updated = await db("BOOKINGS").update("BOOKING_STATUS","Confirmed").where("ID",request.query.bookId);
      response.send("Booking updated successfully!");
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to update bookings!"+e);
    }
  });

  bookingRoute.get("/bookingsummary", async (request,response)=>{
    const routes = await db("ROUTES").where("ID",request.query.route);
    await getBookingSummary(routes,request).then(async (summary)=>{
    //insert into bookings table with Awaiting CONFIRMATION status
    let bookingRecord = "";
    await db("BOOKINGS").insert(tableObjectfrom(summary)).then((data)=>{
      bookingRecord = data;
    });
    console.log(bookingRecord.ID);
    response.render('bookingSummary',{"refID":bookingRecord,...summary});
    });
  });

  bookingRoute.get("/bookinghistory",(request,response)=>{
    response.render("bookinghistory",{
    });
  });

  function tableObjectfrom(summary){
    const tableObj =  {
      'ROUTE_ID': summary.routeId,
      'BOOKING_STATUS': 'Awaiting Confirmation',
      'USER_ID':summary.bookedBy,
      'TRAVEL_DATE':moment(summary.date,"DD-MMM-YYYY").format('YYYY-MM-DD'),
      'TOTAL_AMOUNT':summary.amount
    }
    return tableObj;
  }
  async function getBookingSummary(routes,request){
    const route = routes[0];
    let fromPlace = "";
    let toPlace = "";
    if(route){
      const places = await db("PLACE").whereIn("ID",[route.START_PLACE_ID,route.DEST_PLACE_ID]);
      for(place of places){
        if(place.ID === route.START_PLACE_ID){
            fromPlace = place.NAME;
        }else{
          toPlace = place.NAME;
        }
      }

      let totalAmount =0;
      await getTotalAmount(route.DIST_KM,route.TRANSPORT_TYPE,1).then((amount)=>{
        totalAmount = amount;
      });
      return {
        from: fromPlace,
        to: toPlace,
        transportType:route.TRANSPORT_TYPE,
        distance:route.DIST_KM,
        date: request.query.date,
        amount: totalAmount,
        routeId: route.ID,
        bookedBy: request.query.userId
      }
  }else{
    throw new Error('no route exists');
  }
}

async function getTotalAmount(distanceKM,transportType,numberOfSeats=1){
  const result = await db("TRANSPORT_PRICE").where("TRANSPORT_TYPE",transportType);
  if(result[0]){
    const price = result[0];
    return (price.PRICE_PER_KM * distanceKM ) * numberOfSeats;
  }else{
    throw new Error('failed to fetch price details for transport type '+transportType)
  }
}
  module.exports = bookingRoute;