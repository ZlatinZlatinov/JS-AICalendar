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
 *       "200":
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       "404":
 *         description: No users were found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404'
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