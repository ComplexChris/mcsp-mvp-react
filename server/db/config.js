const { Pool } = require("pg");

const pool = new Pool({
  // https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url
  connectionString: "postgres://localhost:5432/test",
});

module.exports = pool;
