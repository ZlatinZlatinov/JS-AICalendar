const express = require('express'); 
const { mongooseInit } = require('./config/mongooseInit');

let app;

startServer();

async function startServer(){
    app = express();
    require('dotenv').config();

    if(process.env.NODE_ENVIRONMENT !== 'test'){
        await mongooseInit(); 
    }

    require('./config/expressInit')(app);
} 

module.exports = app;