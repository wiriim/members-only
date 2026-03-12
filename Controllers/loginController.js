const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../Database/pool');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async function (username, password, done){
        try{
            const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = rows[0];

            if (!user){
                return done(null, false, { message:"Incorrect Username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match){
                return done(null, false, { message:"Incorrect Password" });
            }

            return done(null, user)
        } catch(err){
            throw err;
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log(id)
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch(err) {
      done(err);
    }
});

function getLoginPage(req, res){
    res.render('login');
}


module.exports.getLoginPage = getLoginPage;
module.exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});