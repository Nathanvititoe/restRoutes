//bring in required modules and create pool
const express = require("express");
const app = express();
const { Pool } = require("pg");
const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "company",
});

//apply middleware and instantiate port
app.use(express.json());
const PORT = 3001;

//GET ALL
app.get("/personnel", async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM personnel ORDER BY id");
    if (!results.rows) {
      console.log("no-one works here");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("noone works here");
      return;
    }
    res.status(200).send(results.rows);
  } catch (err) {
    console.log(err.message);
    res.setHeader("content-type", "text/plain");
    res.status(500).send(err.message);
  }
});

//GET ONE
app.get("/personnel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      "SELECT * FROM personnel WHERE id = $1",
      [id]
    );
    if (!results.rows) {
      console.log("no-one works here");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("noone works here");
      return;
    }
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.setHeader("content-type", "text/plain");
    res.status(500).send(err.message);
  }
});

//CREATE ONE
app.post("/personnel", async (req, res) => {
  try {
    const { name, phone } = req.body;
    const results = await client.query(
      "INSERT INTO personnel (name, phone) VALUES ($1, $2)",
      [name, phone]
    );
    res.status(201).send(results.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.setHeader("content-type", "text/plain");
    res.status(500).send(err.message);
  }
});

//UPDATE ONE
app.put("/personnel/:id", async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { id } = req.params;
    const results = await client.query(
      "UPDATE personnel SET name = $1, phone = $2 WHERE id = $3",
      [name, phone, id]
    );
    if (!results.rows) {
      console.log("nothing to update");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("nothing to update");
      return;
    }
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.setHeader("content-type", "text/plain");
    res.status(500).send(err.message);
  }
});

//DELETE ONE
app.delete("/personnel/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await client.query(
        "DELETE FROM personnel WHERE id = $1",
        [id]
      );
      if (!results.rows) {
        console.log("nothing to delete");
        res.setHeader("content-type", "text/plain");
        res.status(400).send("nothing to delete");
        return;
      }
      res.status(200).send(results.rows[0]);
    } catch (err) {
      console.log(err.message);
      res.setHeader("content-type", "text/plain");
      res.status(500).send(err.message);
    }
  });


//create listener
app.listen(PORT, () => {
  console.log("I hear you baby");
});
