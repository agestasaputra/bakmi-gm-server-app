const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const app = express()
const db = require('./config/connection')

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// routes
app.get('/api', (req, res) => {
  res.send('Welcome to api pnj-server-app!')
})

// products - get data
app.get('/api/products', (req, res) => {
  const querySelect = 'SELECT * FROM products'
  db.query(querySelect, (error, result) => {
    if (error) {
      res.status(400).json({
        error,
        message: 'Failed to get data products!'
      })
    }
    res.status(200).json({
      datas: result,
      message: 'Success get data products!'
    })
  })
})

// products - get data by code
app.get('/api/products/:code', (req, res) => {
  const querySelectByCode = `SELECT * FROM products WHERE code = ${req.params.code}`
  db.query(querySelectByCode, (error, result) => {
    if (error) {
      res.status(400).json({
        error,
        message: 'Failed to get data products by code!'
      })
    }
    res.status(200).json({
      datas: result,
      message: 'Success get data products!'
    })
  })
})

// products - post data by code
app.post('/api/products', (req, res) => {
  const data = { ...req.body }
  console.log('data:', data)
  const queryInsert = "INSERT INTO products SET ?"
  db.query(queryInsert, data, (error, result, fields) => {
    if (error) {
      console.log('error:', error)
      res.status(400).json({
        error,
        message: 'Failed to insert data products!'
      })
    }
    res.status(200).json({
      datas: result,
      message: 'Success insert data products!'
    })
  })
})

// products - update data by code
app.put('/api/products/:code', (req, res) => {
  const data = { ...req.body }
  const querySelect = `SELECT * FROM products WHERE code = ?`
  const queryUpdate = `UPDATE products SET ? WHERE code = ?`
  db.query(querySelect, req.params.code, (error, result, fields) => {
    if (error) {
      res.status(400).json({
        error,
        message: 'Failed to get data products by code!'
      })
    }
    
    if (result.length) {
      db.query(queryUpdate, [data, req.params.code], (error, result, fields) => {
        if (error) {
          res.status(400).json({
            error,
            message: 'Failed to update data products!'
          })
        }
        
        res.status(200).json({
          datas: result,
          message: 'Success update data products!'
        })
      })
    } else {
      res.status(404).json({
        error,
        message: 'Data is not found!'
      })
    }
  })
})

// products - delete data by code
app.delete('/api/products/:code', (req, res) => {
  const querySelect = "SELECT * FROM products WHERE code = ?"
  const queryDelete = "DELETE FROM products WHERE code = ?"
  db.query(querySelect, req.params.code, (error, result, fields) => {
    if (error) {
      res.status(400).json({
        error,
        message: 'Failed to get data products by code'
      })
    }
    
    if (result.length) {
      db.query(queryDelete, req.params.code, (error, result, fields) => {
        if (error) {
          res.status(400).json({
            error,
            message: 'Failed to delete data products by code!'
          })
        }

        res.status(200).json({
          datas: result,
          message: 'Success delete data products!'
        })
      })
    } else {
      res.status(404).json({
        error,
        message: 'Data is not found!'
      })
    }
  })
})

// log listen
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`)
})