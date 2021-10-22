const express = require('express')
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

router.get('/', (req, res) => {
  pool.query('SELECT * FROM "leaderboard_view"', (err, response) => {
    if (err) return res.send(err)
    res.send(response.rows)
  })
})

module.exports = router