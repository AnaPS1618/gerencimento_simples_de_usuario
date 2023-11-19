const { Pool } = require("pg");

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '98649336',
  database: 'gerenciamentousuarios'
});

module.exports = pool;