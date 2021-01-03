const express = require('express');
const db = require("../db-connection/connection")

const placeRoute = new express.Router();



placeRoute.get("/places", async (request, response) => {
    try {
      const result = await db("PLACE");
      //console.log(result);
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from place table!");
    }
  });

  placeRoute.get("/places/filter", async (request, response) => {
    try {
      console.log(request.query.prefix)
      //BANGALORE -- BA
      //BAGALKOT  -- BA
      //SELECT * FROM PLACE WHERE NAME LIKE 'BAN%';
      const result = await db("PLACE").where("NAME",'like',request.query.prefix+'%');
      //console.log(result);
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from place table!");
    }
  });
  module.exports = placeRoute;