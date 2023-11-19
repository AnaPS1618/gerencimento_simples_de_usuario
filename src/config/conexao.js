const { Pool } = require("pg");

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'senha_aqui',
  database: 'gerenciamentousuarios'
});

module.exports = pool;
