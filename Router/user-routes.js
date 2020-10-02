const express = require('express');
const router = express.Router();
const User = require('../Model/User')

router.get('/', async (req, res) => {
    const users = await User.find({})
    res.send(users)
    console.log(users);
})


// let user = new User({
//     name: 'Andrew',
//     email: 'coding00@wemail.com',
//     password: 'wordpass123',
// });

// user.save()
//     .then((user) => {
//         console.log(user);
//     })
//     .catch((e) => console.log(e));



module.exports = router;