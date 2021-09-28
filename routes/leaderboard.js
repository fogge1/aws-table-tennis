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

router.get('/', (req, res) => {
    pool.query('SELECT * FROM "Leaderboard"', (err, response) => {
        if (err) {
            res.send(err);
            console.log(err + ' test')
            return;
        }
        else {
            res.status(200).json({
                players: response.rows
            })
            console.log(response.rows)
        }
    })
});

module.exports = router;