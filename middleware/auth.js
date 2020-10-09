const jwt = require('jsonwebtoken');
const User = require('../Model/User');

/* ------------- AUTH Middleware not for login and user creation ------------ */

const auth = async (req, res, next) => {
    try {
        // Grab token from request header ('Authorization') in order to verify
        const token = req.header('Authorization').substring(7);

        // Decode token by way of using verify method -- store in a const
        const decode = jwt.verify(token, 'secret_string');
        console.log(decode)

        // Find user in database using decoded id and original token
        const user = await User.find({
            _id: decode
        });

        if (!user) {
            throw new Error('User does not exist');
        }

        // Attach user & token to request object
        req.user = user;
        req.token = token;

        // Call next to continue to endpoint as this is a middleware
        next();
    } catch {
        res.status(401).send({ Error: 'Invalid Login!' });
    }
};

module.exports = auth;
