const { Pool } = require("pg");

const pool = new Pool({
  // https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url
  connectionString: "postgres://toor:password@localhost:5432/Quiz",
});

module.exports = pool;
