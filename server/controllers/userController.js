const userController = require('express').Router(); 

//Get all users
userController.get('/', (req, res)=>{

}); 

//Create new user
userController.post('/', (req, res)=>{

}); 

//Update user
userController.put('/:userId', (req, res) => {
    const userId = req.params.userId;

}); 

//Delete user
userController.delete('/:userId', (req, res)=>{
    const userId = req.params.userId;

}); 

module.exports = {
    userController
}