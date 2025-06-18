const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwt');

//Find user by id 
async function findUserById(userId) {
    return User.findById(userId);
}

//Get all users 
async function getAllUsers() {
    return User.find({});
}

//Create new user / register
async function createUser({ username, email, password }) {
    const isExisting = await User.findOne({ email: userData.email });

    if (isExisting) {
        throw new Error("This email already exists!");
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    return createToken(user);
}

async function updateUser(userId, userData) {
    const options = {
        new: true // Returns new data, after document is updated
    }

    return User.findByIdAndUpdate({ _id: userId }, userData, options);
}

async function deleteUser(userId) {
    User.findByIdAndDelete({ _id: userId });
}

module.exports = {
    findUserById,
    getAllUsers,
    createUser,
    updateUser, 
    deleteUser
}