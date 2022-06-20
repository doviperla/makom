const pg = require('pg');
const config = require('../../config/config')

const pool = new pg.Pool(config.db);

module.exports = { pgdb: pool };