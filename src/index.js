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
const priceRoute = require("./routes/price");
const bookingRoute = require("./routes/booking");
const path = require("path");
const hbs = require("hbs");




const app = new express();
app.set("view engine", "hbs"); //which is your template engine ?
app.set("views", "templates/views"); //where are your templates ?
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
hbs.registerPartials("templates/partials"); //

//converts string
app.use(express.json());
app.use(placeRoute);
app.use(userRoute);
app.use(healthRoute);
app.use(transportRoute);
app.use(priceRoute);
app.use(bookingRoute)

app.get("/home",(request,response)=>{
  response.render("index",{
    title: "Travel Management",
    name: "Jay",
  });
})

app.listen(3032, () => {
  console.log("application started");
});
