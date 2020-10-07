const mongoose = require('mongoose');
const { isEmail, contains } = require('validator').default;
const bcrypt = require('bcryptjs');

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
                throw new Error('Invalid email');
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
    jsonwebtokens: [
        // array of objects
        // of jsonwebtokens
    ],
});

userSchema.methods.generateAuthToken = async function () {};

userSchema.statics.loginByCredentials = async function (email, password) {};

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        user.password = hashedPassword;
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
