const express = require('express');
const router = express.Router();
const User = require('../Model/User');

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
    console.log(users);
});

module.exports = router;
