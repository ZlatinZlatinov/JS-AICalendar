const authController = require('express').Router(); 

//User login
authController.post('/login', (req, res) => {

}); 

//User logout
authController.get('/logout', (req, res)=> {
    
});

module.exports = {
    authController
}