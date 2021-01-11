const knex = require("knex");

const db = knex({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "password", //root pass 123456789
      database: "travel",
    },
  });

  module.exports = db;