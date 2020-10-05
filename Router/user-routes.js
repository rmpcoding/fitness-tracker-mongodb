const express = require('express');
const router = express.Router();
const User = require('../Model/User');

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
    console.log(users);
});

router.post('/users/create', async (req, res) => {
    console.log('test');
    res.send('test from post route');
});

router.patch('/users/update/:id', async (req, res) => {
    console.log('test');
    res.send('test from patch route');
});

router.delete('/users/:id', async (req, res) => {
    console.log('test');
    res.send('test from delete route');
});

module.exports = router;
