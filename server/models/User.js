const { Schema, model } = require('mongoose'); 

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    hashedPassword: {
        type: String,
        required: true
    },
    address : {
        type: String
    }
}); 

const User = model('User', userSchema); 

module.exports = {
    User
}