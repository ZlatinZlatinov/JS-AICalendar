const { hasUser } = require('../middlewares/guard');
const { loginUser, logout } = require('../services/userService');
const { erorParser } = require('../utils/errorParser');

const authController = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoint for user authentication.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Login as existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged-in successfully
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

//User login
authController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const token = await loginUser({ email, password });
        res.json({ accessToken: token });
    } catch (err) {
        const message = erorParser(err);
        res.status(401).json({ message });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     description: Logout as existing user
 *     tags: [Authentication]
 *     parameters:
 *       - in: header
 *         name: X-Authorization
 *         schema: 
 *           type: strind
 *         required: true
 *         description: Access Token
 *     requestBody:
 *       required: false
 *     responses:
 *       204:
 *         description: User logged-out successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//User logout
authController.post('/logout', hasUser(), (req, res) => {
    const token = req.token;

    logout(token);
    res.status(204).end();
});

module.exports = {
    authController
}