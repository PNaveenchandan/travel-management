const { response } = require('express');
const express = require('express');
const { where } = require('../db-connection/connection');
const db = require("../db-connection/connection")
const transportRoute = new express.Router();

transportRoute.get("/transport-routes",async(request, response)=>{
    try{
     const result = await db("ROUTES").where("START_PLACE_ID",request.query.start_place).where("DEST_PLACE_ID",request.query.dest_place)
        console.log(result);
        response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from transport-routes table!");
    }
});


transportRoute.get("/route/:routeId",async(request, response)=>{
    const routes = await db("ROUTES").where("ID",request.params.routeId);
    const route = routes[0];
    const places = await db("PLACE").whereIn("ID",[route.START_PLACE_ID,route.DEST_PLACE_ID]);
    let startPlace,endPlace = "";
    for(place of places){
      if(place.ID === route.START_PLACE_ID){
        startPlace = place.NAME;
      }else{
        endPlace = place.NAME;
      }
    }
    response.render("route",{
      "routeId":route.ID,
      "from":startPlace,
      "to":endPlace,
      "transportType":route.TRANSPORT_TYPE,
      "distance":route.DIST_KM
    });
});

module.exports =transportRoute;