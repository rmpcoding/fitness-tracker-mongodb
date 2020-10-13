const mongoose = require('mongoose');
const { isEmail, contains } = require('validator').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Study = require('./Study');

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

    // Stores JSONwebtokens to login from multiple devices
    jsonwebtokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

/* ----------------- PREVENTS USER FROM VIEWING TOKENS & PW ----------------- */

userSchema.methods.toJSON = function () {
    const user = this;

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.jsonwebtokens;

    return userObj;
};

/* -------------- GENERATES JSON WEB TOKEN AFTER USER CREATION -------------- */

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

/* ----------------------- VIRTUAL REF TO STUDY NOTES ----------------------- */

userSchema.virtual('study_notes', {
    ref: 'Study',
    localField: '_id',
    foreignField: 'owner',
});

/* ------------------------------ LOGS IN USER ------------------------------ */

userSchema.statics.loginByCredentials = async function (email, password) {
    const user = this;

    User.find({ email });

    if (!user) {
        throw new Error('Invalid Credentials!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid Credentials!');
    }

    return user;
};

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

/* -------------------- PRE-DELETE HOOK: REMOVES STUDY NOTES  ----------------- */

userSchema.pre('remove', async function (next) {
    const user = this;

    await Study.deleteMany({
        owner: user._id,
    });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
