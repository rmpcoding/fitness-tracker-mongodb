const mongoose = require('mongoose');
require('../db/mongoose');

/* -------------- SKELETON OF STUDY SCHEMA - WILL CHANGE SOON -------------- */

const studySchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    source: {
        type: String,
    },
    time_allotted: {
        type: String,
    },
    time_spent: {
        type: String,
    },
    date: {
        type: String,
    },
    notes: {
        type: String,
    },
});

const Study = mongoose.model('Study', studySchema)

module.exports = Study;
