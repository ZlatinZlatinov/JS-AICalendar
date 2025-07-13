const request = require('supertest');
const app = require('../../index');
const { User } = require('../../models/User');
// const mongoose = require('mongoose');


describe('User Controller', () => {
    
    it('GET /users should return a list of users', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }); 

    it('should create a new user successfully', async () => {
        const userData = {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
            address: 'New York'
        };

        const response = await request(app)
            .post('/api/v1/users')
            .send(userData)
            .expect(200);

        // Check response structure
        expect(response.body).toHaveProperty('accessToken');
        expect(typeof response.body.accessToken).toBe('string');

        // Verify user was actually created in database
        const createdUser = await User.findOne({ email: userData.email });
        expect(createdUser).toBeTruthy();
        expect(createdUser.username).toBe(userData.username);
        expect(createdUser.email).toBe(userData.email);
    });
});