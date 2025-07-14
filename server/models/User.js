const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "User email is required!"],
        unique: [true, "User email must be unique!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username must be unique!"]
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    },
    hashedPassword: {
        type: String,
        required: [true, "User password is required!"]
    },
    address: {
        type: String
    }
});

const User = model('User', userSchema);

module.exports = {
    User
}