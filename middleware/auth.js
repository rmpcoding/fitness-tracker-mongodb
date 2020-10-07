const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');

/* ------------- AUTH Middleware not for login and user creation ------------ */

const auth = async (req, res, next) => {

    try {
        // Grab token from request header ('Authorization') in order to verify
        // const token = req.header('Authorization').replace('bearer ', '');
        // console.log();
        console.log(token)
        // Decode token by way of using verify method -- store in a const
        // const decode = jwt.verify()
        // Find user in database using decoded id and original token
        // IF user does not exist
            // Throw new error
        // Call next


        next();
    } catch (e) {
        res.status(401).send({ Error: 'Invalid Login!' });
    }
};

module.exports = auth;
