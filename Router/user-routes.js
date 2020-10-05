const express = require('express');
const router = express.Router();
const User = require('../Model/User');

/* ------------------------------- GET Users -------------------------------- */

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
    console.log(users);
});

/* ------------------------------- GET User by ID --------------------------- */


router.post('/users/create', async (req, res) => {
    console.log('test');
    res.send('test from post route');
});

/* ------------------------------- UPDATE User ------------------------------ */

router.patch('/users/update/:id', async (req, res) => {
    console.log('test');
    res.send('test from patch route');
});

/* ------------------------------- DELETE User ------------------------------ */

router.delete('/users/delete/:id', async (req, res) => {
    console.log('test');
    res.send('test from delete route');
});

module.exports = router;
