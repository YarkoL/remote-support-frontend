"use strict"
const https = require('https');
const http = require('http');
const fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');


const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

http.createServer(app).listen(3000);
https.createServer(options, app).listen(3030);

app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname, 'public','index.html'))
});

console.log('http server listening on port 3000');
console.log('https server listening on port 3030');



