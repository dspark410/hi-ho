const express = require('express')
require('dotenv').config()

const db = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('server running..'))

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
  })
})
