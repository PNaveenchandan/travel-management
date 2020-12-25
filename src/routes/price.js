const express = require('express');
const db = require("../db-connection/connection")
const priceRoute = new express.Router();

priceRoute.get("/price",async(request, response)=>{
    try{
     const result = await db("TRANSPORT_PRICE")
        console.log(result);
        response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetcH from Price table!");
    }
});
  
  module.exports = priceRoute;
  