const eventParticipantsController = require('express').Router();
const { 
    getEventParticipants, addParticipantToEvent, updateParticipantOfEvent, removeParticipantFromEvent 
} = require('../services/eventParticipantsService');
const { erorParser } = require('../utils/errorParser');

/**
 * @swagger
 * tags:
 *   name: Event Participants
 *   description: API endpoint for managing event participants.
 */

/**
 * @swagger
 * /events/{eventId}/participants:
 *   get:
 *     summary: Get event participants
 *     description: Returns event and list of participants
 *     tags: [Event Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema: 
 *           type: strind
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event participants
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/EventParticipants'
 *       404:
 *         description: Event Participants not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /events/{eventId}/participants:
 *   post:
 *     summary: Add Participant
 *     description: Add new participant to event
 *     tags: [Event Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema: 
 *           type: strind
 *         required: true
 *         description: The event ID
 *       - in: header
 *         name: X-Authorization
 *         schema: 
 *           type: strind
 *         required: true
 *         description: Access Token
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddEventParticipantRequest'
 *     responses:
 *       200:
 *         description: Participant added successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/EventParticipants'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /events/{eventId}/participants/{userId}:
 *   put:
 *     summary: Update event participant
 *     description: Updates an existing event participant
 *     tags: [Event Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event participant ID
 *       - in: header
 *         name: X-Authorization
 *         schema: 
 *           type: strind
 *         required: true
 *         description: Access Token
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventParticipantRequest'
 *     responses:
 *       200:
 *         description: Event participant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/EventParticipants'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//Update event participant
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

/**
 * @swagger
 * /events/{eventId}/participants/{userId}:
 *   delete:
 *     summary: Delete event participant
 *     description: Remove participant from event
 *     tags: [Event Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: header
 *         name: X-Authorization
 *         schema: 
 *           type: strind
 *         required: true
 *         description: Access Token
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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