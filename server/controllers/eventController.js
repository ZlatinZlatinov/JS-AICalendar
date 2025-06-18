const eventController = require('express').Router(); 

//Get all events
eventController.get('/', (req, res)=>{

}); 

//Get event details
eventController.get('/:eventId', (req, res)=>{
    const eventId = req.params.eventId;
    
});

//Create new event
eventController.post('/', (req, res)=>{
    
}); 

//Update event
eventController.put('/:eventId', (req, res)=>{
    const eventId = req.params.eventId;

}); 

//Delete event
eventController.delete('/:eventId', (req, res)=>{
    const eventId = req.params.eventId;

}); 

module.exports = {
    eventController
}