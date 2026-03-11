const express = require('express');
const app = new express();

app.get('/', (req, res) => res.send('Hello World!'));

const DEFAULT_PORT = process.env.DEFAULT_PORT;
app.listen(DEFAULT_PORT, (err) => {
    if (err)
        throw err;

    console.log(`Application is listening on port ${DEFAULT_PORT}`);
});
