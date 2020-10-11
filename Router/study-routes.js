const express = require('express');
const router = express.Router();
const Study = require('../Model/Study');
const auth = require('../middleware/auth');

/* ------------------------------- POST ROUTE ------------------------------- */

router.post('/study', auth, async (req, res) => {
    try {
        const _id = req.user._id;
        const study = new Study({ ...req.body, owner: _id });
        await study.save();
        res.send(study);
    } catch (e) {
        throw new Error(`Error: ${e}`);
    }
});

/* ------------------------------- GET Route -------------------------------- */

router.get('/study', async (req, res) => {
    const notes = await Study.find({});
    console.log(notes);
    res.send('notes test');
});

/* ------------------------------- GET Route by ID -------------------------- */

router.get('/study/:id', async (req, res) => {
    const notes = await Study.find({});
    console.log(notes);
    res.send('notes by id');
});

/* ------------------------------- PATCH ROUTE ------------------------------ */

router.patch('/study/update/:id', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

/* ------------------------------- DELETE ROUTE ----------------------------- */

router.delete('/study/delete/:id', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
