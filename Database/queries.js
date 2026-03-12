const pool = require('./pool');

async function signUp(username, email, password){
    await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
}

async function createmsg(message, createdDate, usersId){
    await pool.query('INSERT INTO messages(message, created_date, users_id) VALUES ($1, $2, $3)', [message, createdDate, usersId]);
}

async function getAllMsg(){
    const {rows} = await pool.query('SELECT * FROM messages JOIN users on messages.users_id = users.id');
    return rows;
}

module.exports = {
    signUp, createmsg, getAllMsg
}