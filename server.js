var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');

var app = express();
var port = (process.env.PORT || 8080);

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('listenning on ' + port)
});