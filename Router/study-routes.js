const express = require('express');
const router = express.Router();
const Study = require('../Model/Study');
const auth = require('../middleware/auth');

/* ------------------------------- POST ROUTE ------------------------------- */

router.post('/study', auth, async (req, res) => {
    const _id = req.user._id;

    try {
        const study = new Study({ ...req.body, owner: _id });
        await study.save();
        res.send(study);
    } catch (e) {
        throw new Error(`Error: ${e}`);
    }
});

/* ------------------------------- GET Route -------------------------------- */

router.get('/study', auth, async (req, res) => {
    const notes = await Study.find({});
    console.log(notes);
    res.send(notes);
});

/* ------------------------------- GET Route by ID -------------------------- */

router.get('/study/:id', async (req, res) => {
    const notes = await Study.find({});
    console.log(notes);
    res.send(notes);
});

/* ------------------------------- PATCH ROUTE ------------------------------ */

router.patch('/study/update/:id', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
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
        const deleteAll = await Study.remove({
            owner: req.user._id
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
