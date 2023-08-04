const { Pool } = require("pg");

const pool = new Pool({
  user: 'conas',
  host: 'localhost',
  database: 'conasqk4_part',
  password: '848448',
  port: 5432, // default PostgreSQL port
});

module.exports = { pool };
