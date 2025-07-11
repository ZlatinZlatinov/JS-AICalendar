const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'AI Calendar API',
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
                Event: {
                    type: 'object',
                    required: ['title', 'description', 'location', 'date', 'freeSlots'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID of the Event'
                        },
                        title: {
                            type: 'string',
                            description: 'Event Title'
                        },
                        description: {
                            type: 'string',
                            description: 'Event Description'
                        },
                        location: {
                            type: 'string',
                            description: 'Event Location'
                        },
                        date: {
                            type: 'string',
                            description: 'Event start date'
                        },
                        time: {
                            type: 'string',
                            description: 'Event start time'
                        },
                        freeSlots: {
                            type: 'number',
                            description: 'Available free slots'
                        },
                        createdAt: {
                            type: 'string',
                            description: 'When the record was created'
                        },
                        ownerId: {
                            type: 'string',
                            description: 'The owner of the Event'
                        },
                        participants: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'List of string of participants ID'
                        }
                    }
                },
                EventParticipants: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID of the Event'
                        },
                        title: {
                            type: 'string',
                            description: 'Event Title'
                        },
                        description: {
                            type: 'string',
                            description: 'Event Description'
                        },
                        location: {
                            type: 'string',
                            description: 'Event Location'
                        },
                        date: {
                            type: 'string',
                            description: 'Event start date'
                        },
                        time: {
                            type: 'string',
                            description: 'Event start time'
                        },
                        freeSlots: {
                            type: 'number',
                            description: 'Available free slots'
                        },
                        createdAt: {
                            type: 'string',
                            description: 'When the record was created'
                        },
                        ownerId: {
                            type: 'string',
                            description: 'The owner of the Event'
                        },
                        participants: {
                            type: 'array',
                            items: {
                                type: 'object',
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
                                    createdAt: {
                                        type: 'string',
                                        description: 'When was user account created'
                                    }
                                }
                            },
                            description: 'List of objects of participants'
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
                CreateEventRequest: {
                    type: 'object',
                    required: ['title', 'description', 'location', 'date', 'freeSlots'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Event Title'
                        },
                        description: {
                            type: 'string',
                            description: 'Event Description'
                        },
                        location: {
                            type: 'string',
                            description: 'Event Location'
                        },
                        date: {
                            type: 'string',
                            description: 'Event start date'
                        },
                        time: {
                            type: 'string',
                            description: 'Event start time'
                        },
                        freeSlots: {
                            type: 'number',
                            description: 'Available free slots'
                        },
                    }
                },
                AddEventParticipantRequest: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'User ID'
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
                UpdateEventRequest: {
                    type: 'object',
                    required: ['title', 'description', 'location', 'date', 'freeSlots'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Event Title'
                        },
                        description: {
                            type: 'string',
                            description: 'Event Description'
                        },
                        location: {
                            type: 'string',
                            description: 'Event Location'
                        },
                        date: {
                            type: 'string',
                            description: 'Event start date'
                        },
                        time: {
                            type: 'string',
                            description: 'Event start time'
                        },
                        freeSlots: {
                            type: 'number',
                            description: 'Available free slots'
                        },
                    }
                },
                UpdateEventParticipantRequest: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'User email'
                        },
                        username: {
                            type: 'string',
                            description: 'Username'
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