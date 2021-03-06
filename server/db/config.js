const { Pool } = require("pg");


require('dotenv').config()
console.log("DATABASE URL: ", process.env.DATABASE_URL)
const pool = new Pool({
  // https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url
  connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'dev' ? false : {
        rejectUnauthorized: false
    }
});

module.exports = pool;
