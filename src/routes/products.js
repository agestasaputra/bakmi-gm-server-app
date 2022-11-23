const express = require('express')
const router = express.Router()
const db = require('../config/connection')

// products - get data
router.get('/', (req, res) => {
  const querySelect = 'SELECT * FROM products'
  db.query(querySelect, (error, result) => {
    console.log('error:', error)
    console.log('result:', result)
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
router.get('/:code', (req, res) => {
  const querySelectByCode = `SELECT * FROM products WHERE code = '${req.params.code.toString()}'`
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
router.post('/', (req, res) => {
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
router.put('/:code', (req, res) => {
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
router.delete('/:code', (req, res) => {
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

module.exports = router