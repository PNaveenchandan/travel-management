const knex = require("knex");

const db = knex({
    client: "mysql",
    connection: {
      host: "travel.cblps9zeiw1w.eu-west-2.rds.amazonaws.com",
      user: "admin",
      password: "9916141000travel",
      database: "travel",
    },
  });

  module.exports = db;