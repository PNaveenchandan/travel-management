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

module.exports =transportRoute;