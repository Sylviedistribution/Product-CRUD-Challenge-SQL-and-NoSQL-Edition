
const mongoose = require('mongoose');
const mysql = require('mysql2');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// Create a connection object using credentials from the .env file
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,        // e.g., localhost
  user: process.env.MYSQL_USER,        // e.g., root
  password: process.env.MYSQL_PASSWORD,// your DB password
  database: process.env.MYSQL_DB       // database name (e.g., my_app_db)
});
// Attempt to connect to the MySQL database
db.connect((err) => {
  if (err) {
    // If connection fails, print error and stop server
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  } else {
    // If connection is successful
    console.log('MySQL connected');
  }
});
module.exports = {connectDB, db}