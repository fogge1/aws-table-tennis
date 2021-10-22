const express = require('express');
const { allowCrossDomain } = require('./middleware/cors.js');
const  app = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
require("dotenv").config({ path: "./.env" })

const leaderboard = require('./routes/leaderboard');
const signUp = require('./routes/signUp');
const players = require('./routes/players');
const matches = require('./routes/matches');
const login = require('./routes/login');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(allowCrossDomain)
app.use('/players', players)
app.use('/leaderboard', leaderboard)
app.use('/signup', signUp)
app.use('/matches', matches)
app.use('/login', login)