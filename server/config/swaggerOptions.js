const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Coding Events API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3030/api/v1',
                description: 'Development server'
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'The email of the user'
                        },
                        username: {
                            type: 'string',
                            description: 'The username of the user'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user'
                        },
                        createdAt: {
                            type: 'string',
                            description: 'When was user account created'
                        }
                    }
                },
                CreateUserRequest: {
                    type: 'object',
                    required: ['email', 'username', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'The email of the user'
                        },
                        username: {
                            type: 'string',
                            description: 'The username of the user'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user'
                        },
                        address: {
                            type: 'string',
                            description: 'The address of the user'
                        }
                    }
                },
                UpdateUserRequest: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'The username of the user'
                        },
                        address: {
                            type: 'string',
                            description: 'The address of the user'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        accessToken: {
                            type: 'string',
                            description: 'JWT access token'
                        }
                    }
                }
            }
        }
    },
    apis: ['./controllers/*.js'], // files containing annotations as above
};

module.exports = swaggerOptions;