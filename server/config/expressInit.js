const express = require('express'); 
const cors = require('cors');
const config = require('./config.js');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors({
        origin: config.origin,
        credentials: true,
        allowedHeaders: 'Content-Type, X-Authorization',
    })); 

    app.listen(config.port, ()=> {
        console.log(`Now listening on port ${config.port} ...`);
    });
}