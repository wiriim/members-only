const pool = require('./pool');

async function signUp(username, email, password){
    await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
}

module.exports = {
    signUp
}