const { request } = require("express");
const express = require("express");
const uuid = require("uuid");
const placeRoute = require("./routes/place");
const db = require("./db-connection/connection")
const userRoute = require("./routes/user")

const app = new express();
//converts string
app.use(express.json());
app.use(placeRoute);
app.use(userRoute);

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

app.listen(3032, () => {
  console.log("application started");
});
