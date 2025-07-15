const request = require('supertest');
const app = require('../../index');
const { User } = require('../../models/User');
// const mongoose = require('mongoose');

const url = '/api/v1/users';

describe('GET /users', () => {
    jest.mock('../../models/User');
    jest.mock('../../services/userService');

    it('should return and empty array when no users exist', async () => {
        const response = await request(app).get(url);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }); 

    it('should return array of all users when users exist', async () => {
        const user1 = await User.create({
            username: 'user1',
            email: 'user1@test.com',
            hashedPassword: 'hashedpass1',
            address: 'Address 1'
        });
        const user2 = await User.create({
            username: 'user2', 
            email: 'user2@test.com',
            hashedPassword: 'hashedpass2',
            address: 'Address 2'
        }); 

        const response = await request(app).get(url);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].username).toBe('user1');
        expect(response.body[1].username).toBe('user2');
    });
});

describe('GET /users/{userId}', () => {
    jest.mock('../../models/User');
    jest.mock('../../services/userService');

    it('should successfully return user by valid id', async () => {
        const testUser = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            hashedPassword: 'hashedpass123',
            address: 'Test Address'
        });

        console.log(testUser._id);

        const response = await request(app).get(`${url}/${testUser._id}`);

        expect(response.status).toBe(200);
        expect(response.body.username).toBe(testUser.username);
        expect(response.body.email).toBe(testUser.email);
    });

    it('should return status 404 when user does not exist', async () => {
        const userId = '6876349536f9fa943b2152bc';

        const response = await request(app).get(`${url}/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found!");
    });

    it('should return status 404 with invalid userId', async () => {
        const fakeId = 'abcd123456';

        const response = await request(app).get(`${url}/${fakeId}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Invalid ID field!");
    });
});

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