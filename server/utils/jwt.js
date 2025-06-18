const jwt = require('jsonwebtoken');

//Create new token for user
function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        userName: user.username
    } 

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '4h'
    });
} 

module.exports = {
    createToken
}