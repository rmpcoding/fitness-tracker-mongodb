const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1/study-tracker', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .catch((e) => console.log(e));
