const { hasUser } = require('../middlewares/guard');
const { loginUser, logout } = require('../services/userService');
const { erorParser } = require('../utils/errorParser');

const authController = require('express').Router();

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

//User logout
authController.post('/logout', hasUser(), (req, res) => {
    const token = req.token;

    logout(token);
    res.status(204).end();
});

module.exports = {
    authController
}