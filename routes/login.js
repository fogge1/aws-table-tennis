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
  pool.query(`SELECT * FROM public."player" WHERE email = '${req.body.email}'`, async (err, response) => {
      if (err) return res.send(err)
      let user = response.rows[0]
      if (!user) return res.send('No combination with that email and password')

      let validPass = await bcrypt.compare(req.body.password, user.password)
      console.log(validPass)
      if(!validPass) return res.send('No combination with that email and password')

      res.send(user)
      console.log(user)
  })
})

module.exports = router