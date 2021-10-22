const express = require('express');
const router = express();
const dbConfig = require("../config/db.config.js");

const { Pool, Client } = require('pg');
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});


router.post('/', (req, res) => {
  let player = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }

  pool.query(`INSERT INTO public."player" (name, email, password) VALUES ('${player.name}', '${player.email}', '${player.password}')`, (err, response) => {
    if (err) res.send(err);
    else res.send('Player added')
  })
})

module.exports = router;