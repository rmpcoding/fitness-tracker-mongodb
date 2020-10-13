const express = require('express');
const router = express.Router();
const Study = require('../Model/Study');
const auth = require('../middleware/auth');

/* ------------------------------- POST ROUTE ------------------------------- */

router.post('/study', auth, async (req, res) => {
    const _id = req.user._id;

    try {
        const study = new Study({
            ...req.body,
            owner: _id,
        });

        await study.save();

        res.send(study);
    } catch (e) {
        throw new Error(`Error: ${e}`);
    }
});

/* ------------------------------- GET Route -------------------------------- */

router.get('/study', auth, async (req, res) => {
    try {
        const notes = await Study.find({
            owner: req.user._id,
        });
        res.send(notes);
    } catch {
        res.status(404).send();
    }
});

/* ------------------------------- GET Route by ID -------------------------- */

router.get('/study/:id', auth, async (req, res) => {
    const _id = req.params.id;

    const notes = await Study.findOne({
        _id,
        owner: req.user._id,
    });
    console.log(notes);
    res.send(notes);
});

/* ------------------------------- PATCH ROUTE ------------------------------ */

router.patch('/study/update/:id', auth, async (req, res) => {
    // Store user in a const named user
    const user = req.user;
    // Store update requests from request body in an array
    const requestUpdates = req.body;
    // Store params in a const _id
    const _id = req.params.id;
    // Store updates from request body into an array containing only the request body's properties (e.g., [name, email] etc...)
    const updateArrayFromUser = Object.keys(requestUpdates);
    // Store array of updateable properties (user shouldn't update _id, tokens, or any other information as such)
    const allowedUpdates = [
        'subject',
        'source',
        'time_allotted',
        'time_spent',
        'date',
        'notes',
    ];
    // Check to see if every element from User's updates from request body passes the next condition
    const isValidOperation = updateArrayFromUser.every((update) => {
        // Checks to see whether the User's updates from request body is included in allowed updates array
        return allowedUpdates.includes(update);
    });

    // If operation is not allowed, deny user ability to change information
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const updatedNote = await Study.findOne({
            _id,
            owner: user._id,
        });

        if (!updatedNote) {
            return res.status(404).send();
        }

        updateArrayFromUser.forEach((update) => {
            // Update property field will be updated from request body
            return updatedNote[update] = requestUpdates[update];
        });
        // Save updatedNote updates in database
        await updatedNote.save();
        // Send updatedNote data
        res.send(updatedNote)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

/* ---------------------------- DELETE ONE ROUTE ---------------------------- */

router.delete('/study/delete/:id', auth, async (req, res) => {
    const _id = req.params.id;
    console.log(_id);

    try {
        const deleteNote = await Study.deleteOne({
            _id,
            owner: req.user._id,
        });

        if (!deleteNote) {
            res.status(404).send();
        }

        res.send(deleteNote);
    } catch {
        res.status(404).send();
    }
});

/* ---------------------------- DELETE ALL ROUTE ---------------------------- */

router.delete('/study/deleteAll', auth, async (req, res) => {
    try {
        const deleteAll = await Study.deleteMany({
            owner: req.user._id,
        });

        if (!deleteAll) {
            res.status(404).send();
        }

        res.send(deleteAll);
    } catch {
        res.status(404).send();
    }
});

module.exports = router;
