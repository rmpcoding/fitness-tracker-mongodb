const mongoose = require('mongoose');
const { isEmail, contains } = require('validator').default;

require('../db/mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: (email) => {
            if (!isEmail(email)) {
                throw new Error('Invalid email')
            } 
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: (password) => {
            if (contains(password, 'password', { ignoreCase: true })) {
                throw new Error('Choose a different password');
            }
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;