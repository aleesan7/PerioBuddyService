'use strict';

const express = require('express');
const cors = require('cors')
const path = require('path');
const port = process.env.PORT || 3000;

//var elections = require('./src/routes/elecciones');
//var images = require('./routes/images');
var users = require('./routes/users')
//var albums = require('./routes/albums')
//var text = require('./routes/text')

const app = express();

//app.use(logger('dev'))
app.use(cors())

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

//app.use('', images);
app.use('', users);
//app.use('', albums);
//app.use('', text);

app.get('/', (req, res) => {
    res.json({ message: 'This is the PerioBuddy Service!' });
  });

module.exports = app.listen(port);