const { TestDatabase } = require('./memory-db-setup');

let testDb;

// Setup before all tests
beforeAll(async () => {
    testDb = new TestDatabase();
    await testDb.connect();
});

// Cleanup after all tests
afterAll(async () => {
    await testDb.disconnect();
});

// Clear database before each test
// beforeEach(async () => {
//     await testDb.clearDatabase();
// });

// Make testDb available globally
global.testDb = testDb;