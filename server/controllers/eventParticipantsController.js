const eventParticipantsController = require('express').Router();
const { 
    getEventParticipants, addParticipantToEvent, updateParticipantOfEvent, removeParticipantFromEvent 
} = require('../services/eventParticipantsService');
const { erorParser } = require('../utils/errorParser');

//Get Event Participants 
eventParticipantsController.get('/:eventId/participants', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const participants = await getEventParticipants(eventId);
        res.json(participants);
    } catch (err) {
        const msg = erorParser(err);
        console.log(msg);

        res.status(404).json({ message: "No participants were found!" });
    }
});

//Add participant to event
eventParticipantsController.post('/:eventId/participants', async (req, res) => {
    const eventId = req.params.eventId;
    const participantId = req.body.participantId;

    try {
        const participant = await addParticipantToEvent(eventId, participantId);
        res.json(participant);
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message: "Failed to add participant to event!" });
    }
});

//Uptdate event participant
eventParticipantsController.put('/:eventId/participants/:userId', async (req, res) => {
    const eventId = req.params.eventId; 
    const participantId = req.params.userId;
    const participantData = req.body.participantData;

    try {
        const participant = await updateParticipantOfEvent(eventId, participantId, participantData);
        res.json(participant);
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message: "Failed to update participant of event!" });
    }
});

//Remove participant from event
eventParticipantsController.delete('/:eventId/participants/:userId', async (req, res) => {
    const eventId = req.params.eventId; 
    const participantId = req.params.userId;

    try {
        const participant = await removeParticipantFromEvent(eventId, participantId);
        res.json(participant);
    } catch (err) {
        const message = erorParser(err);
        console.log(message);

        res.status(400).json({ message: "Failed to remove participant from event!" });
    }
});

module.exports = {
    eventParticipantsController
}