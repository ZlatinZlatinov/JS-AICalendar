const { Event } = require('../models/Event'); 

//Get all participants of an event 
function getEventParticipants(eventId){
    return Event.findById(eventId).populate('participants');
}

//Add participant to an event 
function addParticipantToEvent(eventId, participantId){
    const options = {
        new: true,
    };

    return Event.findByIdAndUpdate(eventId, { $push: { participants: participantId } }, options);
}

//Update participant of an event  
function updateParticipantOfEvent(eventId, participantId, participantData){
    //not implemented yet
}

//Remove participant from an event
async function removeParticipantFromEvent(eventId, participantId){
    const event = await Event.findById(eventId);
    event.participants = event.participants.filter(id => id.toString() !== participantId.toString());
    
    return event.save();
} 

module.exports = {
    getEventParticipants,
    addParticipantToEvent,
    updateParticipantOfEvent,
    removeParticipantFromEvent
}