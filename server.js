const express = require('express');
const userRouter = require('./Router/user-routes');
const studyRouter = require('./Router/study-routes');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(userRouter)
app.use(studyRouter)

app.listen(PORT, () => {
    console.log(`App is now listening on http://localhost:${PORT}`);
});
