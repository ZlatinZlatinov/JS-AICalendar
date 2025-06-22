const eventController = require('express').Router();
const {
    getAllEvents, getEventById, createEvent, updateEvent, deleteEvent
} = require('../services/eventService');
const { erorParser } = require('../utils/errorParser');

//Get all events
eventController.get('/', async (req, res) => {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (err) {
        const msg = erorParser(err)
        console.log(msg);

        res.status(404).json({ message: "No events were found!" });
    }
});

//Get event details
eventController.get('/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const eventDetails = await getEventById(eventId);
        res.json(eventDetails);
    } catch (err) {
        const msg = erorParser(err);
        console.log(msg);

        res.status(404).json({ message: "No such event!" });
    }
});

//Create new event
eventController.post('/', async (req, res) => {
    const ownerId = req.user.id;

    const {
        title,
        date,
        description,
        location,
        freeSlots,
        participants,
        time,
        dateRange,
    } = req.body;

    try {
        const eventDetails = await createEvent(
            title, date, description, location, freeSlots, participants, time, dateRange, ownerId
        );

        return eventDetails;
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message });
    }
});

//Update event
eventController.put('/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    const {
        title,
        date,
        description,
        location,
        freeSlots,
        participants,
        time,
        dateRange,
    } = req.body;

    try {
        const eventData = await updateEvent(eventId, {
            title, date, description, location, freeSlots, participants, time, dateRange,
        });

        res.json(eventData);
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message });
    }
});

//Delete event
eventController.delete('/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        await deleteEvent(eventId);
        res.status(204).json({ message: "Event deleted successfully!" });
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message: "Failed to delete event!" });
    }
});

module.exports = {
    eventController
}