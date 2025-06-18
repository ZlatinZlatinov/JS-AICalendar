const { authController } = require('../controllers/authController');
const { eventController } = require('../controllers/eventController');
const { eventParticipantsController } = require('../controllers/eventParticipantsController');
const { userController } = require('../controllers/userController');

const routes = require('express').Router();

routes.use('/users', userController); 
routes.use('/events', eventController);
routes.use('/events', eventParticipantsController); 
routes.use('/auth', authController);

module.exports = { routes };