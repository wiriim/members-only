const express = require('express');
const app = new express();
const path = require("node:path");

// Configuting view with ejs
app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

// Setting the static assets path
const assetPath = path.join(__dirname, "Public");
app.use(express.static(assetPath));

// Routes
app.get('/', (req, res) => res.render('home'));

// Running / Listening the application
const DEFAULT_PORT = process.env.DEFAULT_PORT;
app.listen(DEFAULT_PORT, (err) => {
    if (err)
        throw err;

    console.log(`Application is listening on port ${DEFAULT_PORT}`);
});
