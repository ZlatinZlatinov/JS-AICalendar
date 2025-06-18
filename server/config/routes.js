const { userController } = require('../controllers/userController');

const routes = require('express').Router();

routes.use('/users', userController);

module.exports = { routes };