const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(bodyParser.json());
app.use('/api', notesRoutes);

module.exports = app;
