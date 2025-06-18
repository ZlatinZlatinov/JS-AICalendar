const eventParticipantsController = require('express').Router(); 

//Get Event Participants 
eventParticipantsController.get('/:eventId/participants', (req, res)=>{
    const eventId = req.params.eventId;

}); 

//Add participant to event
eventParticipantsController.post('/:eventId/participants', (req, res)=>{
    const eventId = req.params.eventId;

}); 

//Uptdate event participant
eventParticipantsController.put('/:eventId/participants', (req, res)=>{
    const eventId = req.params.eventId;

}); 

//Remove participant from event
eventParticipantsController.delete('/:eventId/participants', (req, res)=>{
    const eventId = req.params.eventId;

}); 

module.exports = {
    eventParticipantsController
}