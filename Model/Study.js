const mongoose = require('mongoose');
const User = require('./User');
require('../db/mongoose');
const validator = require('validator').default;

/* -------------- SKELETON OF STUDY SCHEMA - WILL CHANGE SOON -------------- */

const studySchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    source: {
        type: String,
    },
    time_allotted: {
        type: Number,
    },
    time_spent: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        required: true,
    },
    owner: {
        // reference to the authenticated owner
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Study = mongoose.model('Study', studySchema);

module.exports = Study;
