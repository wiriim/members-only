const db = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    created_date DATE,
    users_id INTEGER REFERENCES users(id)
);
`;

async function main(){
    console.log('Creating connection...');
    const client = new db.Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/members_only`
    });
    await client.connect();
    console.log('Connected. Running SQL...');

    await client.query(SQL);
    console.log('SQL finished running. Ending connection...');

    await client.end();
    console.log('Done.');
}

main();