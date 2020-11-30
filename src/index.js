const { request } = require("express");
const express = require("express");
const knex = require("knex");
const uuid = require("uuid");

const db = knex({
  client: "mysql",
  connection: {
    host: "travel.cblps9zeiw1w.eu-west-2.rds.amazonaws.com",
    user: "admin",
    password: "9916141000travel",
    database: "travel",
  },
});

const app = new express();
//converts string
app.use(express.json());

app.get("/health", async (request, response) => {
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

app.get("/places", async (request, response) => {
  try {
    const result = await db("place");
    console.log(result);
    response.send(result);
  } catch (e) {
    console.error(e);
    response.status(500).send("failed to fetch from place table!");
  }
});
app.get("/users", async (request, response) => {
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
app.post("/user", async (request, response) => {
  try {
    const ID = uuid.v4();
    const user = await db("USERS").insert({"ID":ID,...request.body});
    response.send("user created successfully! and uuid is "+ID);
  } catch (e) {
    console.error(e);
    response.status(500).send("failed to create user!");
  }
});

app.delete("/user/:email", async (request, response) => {
  try {
   await db("USERS").delete().where("email",request.params.email);
    response.send("user deleted successfully! in url parameter");
  } catch (e) {
    console.error(e);
    response.status(500).send("failed to delete user!");
  }
});

app.delete("/user", async (request, response) => {
  try {
   await db("USERS").delete().where("email",request.query.email);
    response.send("user deleted successfully! in query");
  } catch (e) {
    console.error(e);
    response.status(500).send("failed to delete user!");
  }
});

app.post("/login", async (request, response) => {
  try {
    console.log();
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
    response.status(500).send("users does not exist from email id");
  }
});

app.listen(3032, () => {
  console.log("application started");
});
