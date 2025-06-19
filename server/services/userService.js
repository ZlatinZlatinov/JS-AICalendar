const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { createToken } = require('../utils/jwt');
const { blackList } = require('../utils/blackList');

//Find user by id 
async function findUserById(userId) {
    return User.findById(userId);
}

//Get all users 
async function getAllUsers() {
    return User.find({});
}

//Create new user / register
async function createUser({ username, email, password, address }) {
    const isExisting = await User.findOne({ email: userData.email });

    if (isExisting) {
        throw new Error("This email already exists!");
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        username,
        email,
        hashedPassword,
        address
    });

    return createToken(user);
}

//Login user
async function loginUser({email, password}) {
    const user = await User.findOne({email}); 

    if(!user) {
        throw new Error("Wrong email or password!");
    } 

    const hashedPassword = user.hashedPassword;
    const match = await bcrypt.compare(password, hashedPassword); 

    if(!match) {
        throw new Error("Wrong email or password!");
    } 

    return createToken(user);
} 

function logout(token) {
    blackList.add(token);
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
    deleteUser, 
    loginUser,
    logout
}