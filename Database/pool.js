const db = require('pg');

const pool = new db.Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/members_only`
});

module.exports = pool;