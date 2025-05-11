// require('dotenv').config(); // Load env variables
// const mysql = require('mysql2');

// const mysqlConnection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   supportBigNumbers: true,
//   bigNumberStrings: true,
// });

// mysqlConnection.connect((err) => {
//   if (err) {
//     console.error('❌ MySQL2 Connection Failed:', err.message);
//   } else {
//     console.log('✅ Connected to MySQL2 using env config');
//   }
// });

// module.exports = mysqlConnection;

require('dotenv').config();
const mysql = require('mysql2/promise'); // ⬅ use the promise version

const mysqlConnection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

module.exports = mysqlConnection;
