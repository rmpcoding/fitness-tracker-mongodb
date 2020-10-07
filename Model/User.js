const mongoose = require('mongoose');
const { isEmail, contains } = require('validator').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

/* -------------- Generates JSON web token after user creation -------------- */

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const secret = 'secret_string';
    const payloadObj = {
        _id: user._id.toString(),
    };

    const token = jwt.sign(payloadObj, secret);
    user.jsonwebtokens = user.jsonwebtokens.concat({ token });

    await user.save();

    return token;
};

userSchema.statics.loginByCredentials = async function (email, password) {};

/* -------------------- PRE-SAVE HOOK: PASSWORD ENCRYPTION  ------------------- */

userSchema.pre('save', async function (next) {
    const user = this;
    const password = user.password;

    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(password, 8);
        user.password = hashedPassword;
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
