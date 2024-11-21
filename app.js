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

