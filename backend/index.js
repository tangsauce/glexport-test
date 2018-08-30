const path = require('path')
const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1', routes)

const api = app.listen(PORT, error =>
  error
    ? console.error(error)
    : console.info(`App listening at port ${PORT}`)
)

module.exports = api
