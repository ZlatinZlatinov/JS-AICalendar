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
        required: true,
        default: Date.now()
    },
    hashedPassword: {
        type: String,
        required: true
    },
    // favorites: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}); 

const User = model('User', userSchema); 

module.exports = {
    User
}