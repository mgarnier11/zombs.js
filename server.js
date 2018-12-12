var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');

var app = express();
var port = 8080;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
server.listen(port, () => {
    console.log('listenning on ' + port)
});