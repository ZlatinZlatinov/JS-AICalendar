const eventController = require('express').Router();
const {
    getAllEvents, getEventById, createEvent, updateEvent, deleteEvent
} = require('../services/eventService');
const { erorParser } = require('../utils/errorParser');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints for managing events
 */ 

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Returns a list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: No events were found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Get event by ID
 *     description: Returns a single event by ID
 *     tags: [Events]
 *     paramethers:
 *       - in: path
 *         name: eventId
 *         schema: 
 *           type: strind
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create new event
 *     description: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//Create new event
eventController.post('/', async (req, res) => {
    const ownerId = req.event.id;

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

/**
 * @swagger
 * /events/{eventId}:
 *   put:
 *     summary: Update event
 *     description: Updates an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Event'
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

/**
 * @swagger
 * /events/{eventId}:
 *   delete:
 *     summary: Delete event
 *     description: Deletes an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
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