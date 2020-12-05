const { request } = require("express");
const express = require("express");
const knex = require("knex");
const uuid = require("uuid");
const placeRoute = require("./routes/place");
const db = require("./db-connection/connection")
const userRoute = require("./routes/user")
const healthRoute = require("./routes/health")
const transportRoutes = require("./routes/transport-routes");
const transportRoute = require("./routes/transport-routes");


const app = new express();
//converts string
app.use(express.json());

app.use(placeRoute);
app.use(userRoute);
app.use(healthRoute);
app.use(transportRoute)

app.listen(3032, () => {
  console.log("application started");
});
