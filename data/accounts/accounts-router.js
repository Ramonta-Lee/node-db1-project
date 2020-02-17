const express = require("express");

// database access using knex
const db = require("../dbConfig.js");

const router = express.Router();

// GET Requests:
router.get("/", (req, res) => {
 // list of accounts
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({ error: "Failed to get the list of accounts" });
    });
});

module.exports = router;
