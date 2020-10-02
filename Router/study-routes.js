const express = require('express');
const router = express.Router();
const Study = require('../Model/Study')

/* ------------------------------- Test Route ------------------------------- */

router.get('/', async (req, res) => {
  const notes = await Study.find({})
  res.send('notes')
  console.log(notes);
})


module.exports = router