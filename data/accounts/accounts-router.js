const express = require("express");

// database access using knex
const db = require("../dbConfig.js");

const router = express.Router();

// GET Requests:
router.get("/", (req, res) => {
  // list of accounts
  
  db.select("*")
    .from("accounts")
    .limit(req.headers.limit)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({ error: "Failed to get the list of accounts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getById(id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "Failed to get Account" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  db("accounts")
    .insert(req.body) //will generate a warning on console when using sqlite, ignore it
    .then(ids => {
      // return getById(ids[0]);
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to add the post" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Failed to update the Account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to remove the Account" });
    });
});

module.exports = router;

// Middleware
function getById(id) {
  return db("accounts")
    .where({ id })
    .first();
  // first returns first item in the array as an object instead of an entire array
}
