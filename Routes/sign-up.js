const { Router } = require('express');
const signUpRouter = new Router();
const signUpController = require('../Controllers/signUpController');

signUpRouter.get('/', signUpController.getSignUpPage);

module.exports = signUpRouter;