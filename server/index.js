const express = require('express'); 
const { mongooseInit } = require('./config/mongooseInit');


startServer();

async function startServer(){
    const app = express();

    await mongooseInit(); 

    require('./config/expressInit')(app);
}


// app.listen(3030, () => {console.log("Server is now listening on port 3030...")});