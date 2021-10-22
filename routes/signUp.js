const express = require('express')
const bcrypt = require('bcrypt')
const router = express()
const dbConfig = require("../config/db.config.js")

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
})


router.post('/', async (req, res) => {
  let player = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  }

  pool.query(`INSERT INTO public."player" (name, email, password) VALUES ('${player.name}', '${player.email}', '${player.password}')`, (err, response) => {
    if (err) return res.send(err)
    res.send('Player added')
  })
})

module.exports = router