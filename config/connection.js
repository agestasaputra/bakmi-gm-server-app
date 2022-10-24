const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bdfcb9f70e8396',
  password: '35e1339a',
  database: 'heroku_7ece704c6477526'
})

// check connection to database
db.connect((error) => {
  if (error) {
    console.log(`Database is failed to connect! ${error}`)
    throw error
  }
  console.log('Database is connected!')
})

module.exports = db