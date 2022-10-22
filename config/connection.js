const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bakmi_gm_db'
})

// check connection to database
db.connect((error) => {
  if (error) {
    console.log(`Database is failed to connect! ${error}`)
    throw error
  }
  console.log('Databse is connected!')
})

module.exports = db