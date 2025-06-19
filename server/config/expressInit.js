const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const { routes } = require('./routes.js');
const session = require('../middlewares/session.js');

module.exports = (app) => {
    app.use(express.json());
    app.use(session());
    app.use(cors({
        origin: config.origin,
        credentials: true,
        allowedHeaders: 'Content-Type, X-Authorization',
    }));

    app.use('/api/v1', routes);

    app.listen(config.port, () => {
        console.log(`Now listening on port ${config.port} ...`);
    });
}