const express = require('express'); 
const { mongooseInit } = require('./config/mongooseInit');

startServer();

async function startServer(){
    const app = express();
    require('dotenv').config();

    await mongooseInit(); 

    require('./config/expressInit')(app);
}