const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRoute = require('./routes/index')
const productsRoute = require('./routes/products')

const app = express()
const port = process.env.PORT || 8080

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// routes
app.use('/api', indexRoute)
app.use('/api/products', productsRoute)

// log listen
app.listen(port, () => {
  console.log(`Your server is running on http://localhost:${port}/api`)
})