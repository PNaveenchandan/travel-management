const express = require('express');
const db = require("../db-connection/connection")
const uuid = require("uuid");
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
  module.exports = bookingRoute;