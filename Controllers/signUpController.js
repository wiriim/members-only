const { body, validationResult, matchedData } = require("express-validator");
const queries = require('../Database/queries');

function getSignUpPage(req, res){
    res.render('sign-up');
}

const validateUser = [
    body('username').trim().notEmpty().withMessage('Username must be filled').isLength({min: 3}).withMessage('Username must be a minimum of 3 characters'),
    body('email').trim().notEmpty().withMessage('Email must be filled').isEmail().withMessage('Enter a valid email'),
    body('password').trim().notEmpty().withMessage('Password must be filled').isLength({min: 3}).withMessage('Password must be a minimum of 3 characters')
];

async function signUp(req, res){
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()){
        return res.status(400).render('sign-up', {
            errors: errors.array(),
        });
    }

    const { username, email, password } = matchedData(req);
    await queries.signUp(username, email, password);
    res.redirect('/');
}

module.exports.getSignUpPage = getSignUpPage;
module.exports.signUp = [validateUser, signUp];