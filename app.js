// app.js: The mai web app file 

//server port
const PORT = 80;

//Imports
var express = require('express');
var http = require('http');
var createError = require('http-errors');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var sessiontore = require('connect-sqlite3')(session);
var path = require('path');
var csrf = require('çsurf');

//App files
var runApp = require("./app/")
var initSocketIO = require("")
var ai = require 

//web server
var app = express();
var server = http.createServer(app);
app.set('views', path.join)
app.set('view engine')


 