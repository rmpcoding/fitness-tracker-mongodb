const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const auth = require('../middleware/auth');

/* ------------------------------- CREATE User ------------------------------- */

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

router.get('/users/login', async (req, res) => {

    try {
        const user = await loginByCredentials(req.body.email, req.body.password);
    
        res.send(users);
    } catch (e) {
        res.status(401).send(e)
    }

});

/* ------------------------------- UPDATE User ------------------------------- */

router.patch('/users/update/:id', async (req, res) => {
    console.log('test');
    res.send('test from patch route');
});

/* ------------------------------- DELETE User ------------------------------- */

router.delete('/users/delete/:id', async (req, res) => {
    console.log('test');
    res.send('test from delete route');
});

module.exports = router;
