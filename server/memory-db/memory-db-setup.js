const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

class TestDatabase {
    constructor() {
        this.mongod = null;
    }

    async connect() {
        //Starts a new in-memory MongoDB instance
        this.mongod = await MongoMemoryServer.create();

        //Get the connection URI for the in-memory MongoDB instance
        const uri = this.mongod.getUri();

        //Connect to the in-memory MongoDB instance
        await mongoose.connect(uri);
    }

    async disconnect() {
        //CLose mongoose connection
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();

        //Drop the database

        //Stop the in-memory MongoDB instance
        await this.mongod.stop();
    }

    async clearDatabase() {
        //Get all collections
        const collections = mongoose.connection.collections;

        //Delete all documents in each collection
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}

module.exports = { TestDatabase };