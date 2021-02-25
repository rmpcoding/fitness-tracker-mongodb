const mongoose = require('mongoose');
const User = require('./User');
require('../db/mongoose');
require('mongoose-type-url');
const validator = require('validator').default;

/* -------------- SKELETON OF STUDY SCHEMA - WILL CHANGE SOON -------------- */

/* ------------------------ UPDATE: ARRAY STUDY ADDED ----------------------- */

/* --------------------- STILL NEED DSA STUDY ATTRIBUTES -------------------- */

const studySchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true,
        required: true,
    },
    priority: {
        type: String,
        trim: true,
    },
    source: {
        urls: [{type: mongoose.SchemaTypes.Url}],
    },
    definition: {
        type: String,
        trim: true,
    },
    notes: {
        type: String,
        trim: true,
    },
    understanding: {
        type: String,
        trim: true,
    },
    method: {
        type: String,
        trim: true,
    },
    return_value: {
        type: String,
        trim: true,
    },
    number_of_arguments: {
        type: Number,
    },
    callback_as_first_argument: {
        type: Boolean,
    },
    time_allotted: {
        type: Number,
        default: 25,
    },
    time_spent: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
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
