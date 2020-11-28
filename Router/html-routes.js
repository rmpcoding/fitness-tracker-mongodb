const express = require('express');
const router = express.Router();
const path = require('path')

const app = express();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/assets/html/index.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/assets/html/login.html'))
})

module.exports = router;
