const { Router } = require('express');
const loginRouter = new Router();
const loginController = require('../Controllers/loginController');

loginRouter.get('/', loginController.getLoginPage);
loginRouter.post('/', loginController.login);

module.exports = loginRouter;