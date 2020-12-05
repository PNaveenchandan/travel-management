const express = require('express');
const db = require("../db-connection/connection")
const healthRoute = new express.Router();


healthRoute.get("/health", async (request, response) => {
    try {
      const result = await db.select(db.raw("curdate()"));
      if (!result) {
        return response.status(404).send("DB is Unhealthy!");
      }
      console.log(result);
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("DB is Unhealthy!");
    }
  });
  
  module.exports = healthRoute;
  