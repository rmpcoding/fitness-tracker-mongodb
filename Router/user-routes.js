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
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        // return res.sendFile(path.resolve('./public/assets/html/home.html'))
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

/* ------------------------------- LOGOUT USER ------------------------------ */

router.post('/users/logout', auth, async (req, res) => {
    const user = req.user;

    console.log(user)

    try {
        user.jsonwebtokens = user.jsonwebtokens.filter((token) => {
            return token.token !== req.token;
        });

        await user.save();

        res.send('logged out');
    } catch (err) {
        res.status(500).send();
    }
});

/* ------------------------------- UPDATE User ------------------------------- */

router.patch('/users/update', auth, async (req, res) => {
    // Store user in a const named user
    const user = req.user;
    // Store update requests from request body in an array
    const requestUpdates = req.body;
    // Store updates from request body into an array containing only the request body's properties (e.g., [name, email] etc...)
    const updateArrayFromUser = Object.keys(requestUpdates);
    // Store array of updateable properties (user shouldn't update _id, tokens, or any other information as such)
    const allowedUpdates = ['name', 'email', 'password'];
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
        // For each update,
        updateArrayFromUser.forEach((update) => {
            // Update property field will be updated from request body
            return user[update] = requestUpdates[update];
        });
        // Save user updates in database
        await user.save();
        // Send user data
        res.send(user)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

/* ------------------------------- DELETE User ------------------------------- */

router.delete('/users/delete', auth, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            _id: req.user._id,
        });
        res.send(user);
    } catch {
        res.status(400).send("Can't Delete Me!");
    }
});

module.exports = router;
