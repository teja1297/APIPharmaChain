
var express = require('express')
var app = express();

var user = require('./user');

app.use('/api', user);

module.exports = app
