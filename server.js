const express = require('express');
const router = require('./Router/user-routes');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router)

app.listen(PORT, () => {
    console.log(`App is now listening on http://localhost:${PORT}`);
});
