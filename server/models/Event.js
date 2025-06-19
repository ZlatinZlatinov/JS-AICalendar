const {Schema, model} = require('mongoose'); 

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    location: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    //Not sure about this one
    freeSlots: {
        type: Number,
        required: true
    },
    //Not sure about this one too
    dateRange: {
        type: String
    }, 
    createdAt: {
        type: String,
        default: Date.now()
    },
    ownerId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}]
}); 

const Event = model('Event', eventSchema); 

module.exports = {
    Event
}