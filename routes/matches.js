const express = require('express');
const router = express();
const dbConfig = require("../config/db.config.js");

const { Pool, Client } = require('pg');
const { post } = require('./leaderboard.js');
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});

router.get('/', (req, res) => {
    pool.query('SELECT * FROM "matches_view"', (err, response) => {
        if (err)  res.send(err);
        else res.send(response.rows)
    })
});

router.get('/:id', (req, res) => {
    pool.query(`SELECT * FROM "matches_view" WHERE id = ${req.params.id}`, (err, response) => {
        if (err)  res.send(err);
        else res.send(response.rows)
    })
});

router.post('/createMatch', (req, res) => {
    let player1_id = req.body.player1_id
    let player2_id = req.body.player2_id
    pool.query(`INSERT INTO public."match" (date, player_ids) VALUES('${new Date()}', '{${player1_id}, ${player2_id}}')`, (err, response) => {
        if (err) res.send(err);
        else res.send('Created match');
    })
})

router.post('/finish/:id', (req, res) => {
    let match = {
        id: req.params.id,
        score1: req.body.score1,
        score2: req.body.score2,
    }
    pool.query(`UPDATE match
    SET points = '{${match.score1}, ${match.score2}}', 
    match_state = 1, 
    winner_id = CASE 
    WHEN ${match.score1} > ${match.score2} THEN match.player_ids[1] 
    WHEN ${match.score2} > ${match.score1} THEN match.player_ids[2] 
    END
    WHERE match.id = ${match.id};
    UPDATE player SET wins = wins + 1 
    WHERE player.id in (select winner_id from match where match.id = ${match.id})`, (err, response) => {
        if (err) res.send(err);
        else res.send('Match finished')
    })
})

module.exports = router;