var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let shopsRouter = require("./routes/shops");
let loginRouter = require("./routes/login")
let logoutRouter = require("./routes/logout")
let tokenVerify = require("./middlewares/tokenHandle")

var app = express();

app.use(logger('dev'));1
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// 2. Set the views directory
app.set('views', path.join(__dirname, 'views')); // Assuming your views are in a 'views' folder in the root directory

app.use('/', indexRouter);
app.use('/users', [tokenVerify], usersRouter);
app.use('/shops', shopsRouter);

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

module.exports = app;
