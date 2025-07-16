const { body, param, header, validationResult } = require('express-validator');
const { hasUser } = require('../middlewares/guard');
const { getAllUsers, findUserById, createUser, updateUser, deleteUser } = require('../services/userService');
const { erorParser } = require('../utils/errorParser');

const userController = require('express').Router();
//TODO: Add user data validation

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users were found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//Get all users
userController.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.json(allUsers);
    } catch (err) {
        const message = erorParser(err);

        res.status(404).json({ message });
    }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by their ID
 *     description: Returns a single user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema: 
 *           type: strind
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//Get user details
userController.get('/:userId',
    param('userId').trim().notEmpty().isMongoId()
        .withMessage("Invalid ID field!"),
    async (req, res) => {
        const userId = req.params.userId;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const userData = await findUserById(userId);

            if (!userData) {
                throw new Error("User not found!")
            }

            res.json(userData);
        } catch (err) {
            const message = erorParser(err);
            console.log(message);

            res.status(404).json({ message });
        }
    });

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     description: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//Create new user
userController.post('/',
    body('email').trim().notEmpty().isEmail()
        .withMessage('Invalid email address!'),
    body('username').trim().notEmpty().isLength({ min: 5 })
        .withMessage('Username should be atleast 5 characters long!'),
    body('password').trim().notEmpty().isLength({ min: 5 })
        .withMessage('Password should be atleast 5 characters long!'),
    body('address').optional({ values: "" }).trim().isLength({ min: 5 })
        .withMessage('Valid adresses are atleast 5 characters long.'),
    async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const address = req.body.address;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const token = await createUser(username, email, password, address);
            res.status(201).json({ accessToken: token });
        } catch (err) {
            const message = erorParser(err);
            console.log(message);

            res.status(400).json({ message });
        }
    });

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user
 *     description: Updates an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//Update user
userController.put('/:userId',
    header('X-Authorization').trim().notEmpty().isJWT()
        .withMessage('X-Authorization header is required!'),
    param('userId').trim().notEmpty().isMongoId()
        .withMessage("Invalid ID field!"),
    body('username').trim().notEmpty().isLength({ min: 5 })
        .withMessage('Username should be atleast 5 characters long'),
    body('address').trim().notEmpty().isLength({ min: 5 })
        .withMessage('Address should be 5 characters long!'),
    hasUser(),
    async (req, res) => {
        const userId = req.params.userId;
        const address = req.body.address;
        const username = req.body.username;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const updatedUser = await updateUser(userId, { address, username }); 

            if(!updatedUser) {
                throw new Error('No such user!');
            }

            res.json(updatedUser);
        } catch (err) {
            const message = erorParser(err);
            console.log(message);

            res.status(409).json({ message });
        }
    });

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes a user account
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//Delete user
userController.delete('/:userId',
    header('X-Authorization').trim().notEmpty().isJWT()
        .withMessage('X-Authorization header is required!'),
    param('userId').trim().notEmpty().isMongoId()
        .withMessage("Invalid ID field!"),
    hasUser(),
    async (req, res) => {
        const userId = req.params.userId;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const isExisting = await deleteUser(userId);

            if (!isExisting) {
                throw new Error('No such user!');
            }

            res.status(204).json({ message: "User deleted!" });
        } catch (err) {
            const message = erorParser(err);
            console.log(message);

            res.status(404).json({ message });
        }
    });

module.exports = {
    userController
}