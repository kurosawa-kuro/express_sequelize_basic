const express = require('express')
const morgan = require("morgan");

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/dummies', require('./routes/dummyRoutes.js'));
app.use('/samples', require('./routes/sampleRoutes'));


app.use(errorHandler);

module.exports = app;


