const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');

const auth = async (req, res, next) => {

    try {
        console.log(req.body.password)
        next();
    } catch (e) {
        throw new Error('Invalid Login!');
    }
};

module.exports = auth;
