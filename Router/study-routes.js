const express = require('express');
const router = express.Router();
const Study = require('../Model/Study');

/* ------------------------------- GET Route -------------------------------- */

router.get('/study', async (req, res) => {
    const notes = await Study.find({});
    console.log(notes);
    res.send('notes test');
});

/* ------------------------------- GET Route by ID -------------------------- */

router.get('/study/:id', async (req, res) => {
  const notes = await Study.find({});
  console.log(notes);
  res.send('notes by id');
});

/* ------------------------------- POST ROUTE ------------------------------- */

router.post('/study', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
});

/* ------------------------------- PATCH ROUTE ------------------------------ */

router.patch('/study/update/:id', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

/* ------------------------------- DELETE ROUTE ----------------------------- */

router.delete('/study/delete/:id', async (req, res) => {
    console.log(req.body)
    res.send(req.body);
});

module.exports = router;
