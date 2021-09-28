const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
require("dotenv").config({ path: "./.env" })

const leaderboard = require('./routes/leaderboard');

app.use('/leaderboard', leaderboard)
app.use('',(req, res, next) => {
    res.status(200).json({
        message: 'Working'
    });
});