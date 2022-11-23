const express = require('express')
const router = express.Router()

// api - get
router.get('/', (req, res, next) => {
  res.send('Welcome to api bakmi-gm-server-app!')
})

module.exports = router