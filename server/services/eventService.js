const { Event } = require('../models/Event');

//Get event by id
async function getEventById(eventId) {
    return Event.findById(eventId);
}

//Get all events
async function getAllEvents() {
    return Event.find({});
}

async function createEvent(
    title, date, description, location, freeSlots, participants, time, dateRange, ownerId
) {
    return Event.create({
        title,
        date,
        description,
        location,
        freeSlots,
        participants,
        time,
        dateRange,
        ownerId
    });
} 

//Update event
async function updateEvent(eventId, eventData) {
    const options = {
        new: true
    };

    return Event.findByIdAndUpdate(eventId, eventData, options);
} 

//Delete event
async function deleteEvent(eventId) {
    return Event.findByIdAndDelete(eventId);
} 

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}

