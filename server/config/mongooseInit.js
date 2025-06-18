const mongoose = require('mongoose');
const config = require('./config');

async function mongooseInit() {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(config.dbURL);
        console.log("Connected to Database");
    } catch (err) {
        console.log('Failed to connect with database!');
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = {
    mongooseInit
}