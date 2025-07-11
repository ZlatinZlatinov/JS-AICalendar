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
userController.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const userData = await findUserById(userId);
        console.log(userData);

        res.json(userData);
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(404).json({ message: "User not found!" });
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
userController.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const address = req.body.address;

    try {
        /* const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }
        */
        const token = await createUser(username, email, password, address);
        res.json({ accessToken: token });
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
userController.put('/:userId', hasUser(), async (req, res) => {
    const userId = req.params.userId;
    const address = req.body.address;
    const username = req.body.username;

    try {
        const updatedUser = await updateUser(userId, { address, username });
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
userController.delete('/:userId', hasUser(), async (req, res) => {
    const userId = req.params.userId;

    try {
        await deleteUser(userId);
        res.status(204).json({ message: "User deleted!" });
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(404).json({ message: "No such user!" });
    }
});

module.exports = {
    userController
}