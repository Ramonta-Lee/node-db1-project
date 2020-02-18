const express = require("express");
const bodyParser = require("body-parser");

const AccountsRouter = require("./data/accounts/accounts-router.js");

const server = express();

server.use(bodyParser.json());
server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>DB Helpers with knex</h2>`);
});

module.exports = server;
