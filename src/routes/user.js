const express = require('express');
const db = require("../db-connection/connection")
const uuid = require("uuid");

const userRoute = new express.Router();

userRoute.get("/users", async (request, response) => {
    try {
      const result = await db("USERS");
      console.log(result);
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from user table!");
    }
  });
  
  //return back uuid of created user
  userRoute.post("/user", async (request, response) => {
    try {
      const generatedID = uuid.v4();
      if(!request.body.ADDRESS){
        throw new Error("address can't be empty")
      }
      const user = await db("USERS").insert({"ID":generatedID,...request.body});
      response.send("user created successfully! and uuid is "+generatedID);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to create user!"+e);
    }
  });
  
  userRoute.delete("/user/:email", async (request, response) => {
    try {
     await db("USERS").delete().where("email",request.params.email);
      response.send("user deleted successfully! in url parameter");
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to delete user!");
    }
  });
  
  userRoute.delete("/user", async (request, response) => {
    try {
     await db("USERS").delete().where("email",request.query.email);
      response.send("user deleted successfully! in query");
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to delete user!");
    }
  });
  
  userRoute.post("/login", async (request, response) => {
    try {
      const userArray = await db("USERS").where("email", request.body.email);
      if (userArray.length === 0) {
        return response.status(404).send("user not found with this email id!");
      }
  
      if (userArray[0].PASS !== request.body.password) {
        return response.status(500).send("user password doesn't match");
      }
      response.send("login successfull!!");
    } catch (e) {
      console.error(e);
      response.status(500).send("fail to authenticate user");
    }
  });

  module.exports = userRoute;