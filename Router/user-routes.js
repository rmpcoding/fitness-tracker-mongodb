const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const auth = require('../middleware/auth');

/* ------------------------------- CREATE User ------------------------------- */
// Does not require Auth middleware
router.post('/users/create', async (req, res) => {
    const user = new User({ ...req.body });

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({
            user,
            token,
        });
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

/* ------------------------------- LOGIN User -------------------------------- */
// Does not require Auth middleware
router.post('/users/login', async (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);

    try {
        const user = await loginByCredentials(
            req.body.email,
            req.body.password
        );
        res.send(user);
    } catch (e) {
        res.status(401).send('Invalid Login!');
    }
});

/* -------------------------------- READ User -------------------------------- */

router.get('/users/profile', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(401).send();
    }
});

/* ------------------------------- UPDATE User ------------------------------- */

router.patch('/users/update/:id', async (req, res) => {
    console.log('test');
    res.send('test from patch route');
});

/* ------------------------------- DELETE User ------------------------------- */

router.delete('/users/delete', auth, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            _id: req.user._id,
        });
        res.send(user)
    } catch {
        res.status(400).send("Can't Delete Me!");
    }
});

module.exports = router;
