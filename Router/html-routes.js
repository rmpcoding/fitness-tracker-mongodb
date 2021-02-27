const express = require('express');
const router = express.Router();
const path = require('path')

const app = express();

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('./public/assets/html/signup.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/assets/html/login.html'))
})

router.get('/home', (req, res) => {
    res.sendFile(path.resolve('./public/assets/html/home.html'))
})

module.exports = router;
