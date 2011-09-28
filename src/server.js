var express = require('express');
var fs = require("fs");

var privateKey = fs.readFileSync(__dirname + '/etc/cert/server.key').toString();
var certificate = fs.readFileSync(__dirname + '/etc/cert/server.crt').toString();

var app = express.createServer({key: privateKey, cert: certificate});

app.use(require('browserify')({
    require : __dirname + '/js/foo.js',
    mount : '/browserify.js',
    filter : require('uglify-js')
}));