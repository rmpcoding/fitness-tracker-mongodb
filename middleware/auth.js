const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = async (req, res) => {
    // Attach authentication via JSON web tokens to requests
    // Create login route to direct over to here, 
    // OR post route can immediately direct to here

    // password must be HASHED password
    bcrypt.compare(req.body.password, password);

}

module.exports = auth;