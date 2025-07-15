const request = require('supertest');
const app = require('../../index');
const { User } = require('../../models/User');
// const mongoose = require('mongoose');

const url = '/api/v1/users';

describe('POST /users', () => {
    jest.mock('../../models/User');
    jest.mock('../../services/userService');

    it('should create a new user successfully', async () => {
        const userData = {
            username: 'john_doe',
            email: 'john_doe@example.com',
            password: 'password123',
            address: 'New York'
        };

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(201);

        // Check response structure
        expect(response.body).toHaveProperty('accessToken');
        expect(typeof response.body.accessToken).toBe('string');

        // Verify user was actually created in database
        const createdUser = await User.findOne({ email: userData.email });
        expect(createdUser).toBeTruthy();
        expect(createdUser.username).toBe(userData.username);
        expect(createdUser.email).toBe(userData.email);
    });

    it('should fail, with status 400, to create user with existing email', async () => {
        const userData = {
            username: 'john_doe1',
            email: 'john_doe@example.com',
            password: 'password123',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400) 

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('This email already exists!');
    }); 

    it('should fail, with status 400, to create user with empty email', async () => {
        const userData = {
            username: 'john_doe2',
            email: '',
            password: 'password123',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('Invalid email address!');
    }); 

    it('should fail, with status 400, to create user with invalid email', async () => {
        const userData = {
            username: 'john_doe2',
            email: 'john@doe',
            password: 'password123',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('');
    });

    it('should fail to create user with empty username', async () => {
        const userData = {
            username: '',
            email: 'john2@example.com',
            password: 'password123',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('');
    }); 

    it('should fail to create user with username less than 5 characters', async () => {
        const userData = {
            username: 'John',
            email: 'johnny@example.com',
            password: 'password123',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('');
    });

    it('should fail to create user with empty password', async () => {
        const userData = {
            username: 'john_doe3',
            email: 'john2@example.com',
            password: '',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('');
    }); 

    it('should fail to create user with password less than 5 characters', async () => {
        const userData = {
            username: 'john_doe3',
            email: 'john2@example.com',
            password: '',
            address: 'New York'
        }; 

        const response = await request(app)
            .post(url)
            .send(userData)
            .expect(400); 

        expect(response.body).toHaveProperty('message');
        // expect(response.body.message).toBe('');
    });
});