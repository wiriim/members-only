const express = require('express');
const path = require("node:path");
const session = require('express-session');
const app = new express();
const passport = require('passport');
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Configuting view with ejs
app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

// Setting the static assets path
const assetPath = path.join(__dirname, "Public");
app.use(express.static(assetPath));

// Routes
const singUpRouter = require('./Routes/sign-upRouter');
const loginRouter = require('./Routes/loginRouter');
const query = require('./Database/queries');
app.get('/', async (req, res) => {
    res.locals.user = req.user;
    const rows = await query.getAllMsg();
    res.render('home', {rows});
});
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) throw err;
        res.redirect('/');
    });
})
app.use('/sign-up', singUpRouter);
app.use('/login', loginRouter);
app.get('/createmsg', async (req, res) => {
    await query.createmsg(req.query.message, new Date(), req.user.id);
    res.redirect('/');
});

// Running / Listening the application
const DEFAULT_PORT = process.env.DEFAULT_PORT;
app.listen(DEFAULT_PORT, (err) => {
    if (err)
        throw err;

    console.log(`Application is listening on port ${DEFAULT_PORT}`);
});
