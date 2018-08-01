var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nav = require('./routes/nav');
var secKill = require('./routes/secKill');
var userManage = require('./routes/userManage');
var salePro = require('./routes/salePro');
var mProduct = require('./routes/mProduct');
var mainLunbo = require('./routes/mainLunbo');
var category = require('./routes/category');
var categoryAPI = require('./api/category');
var saleProAPI = require('./api/salePro');
var secKillAPI = require('./api/secKill');
var mProductAPI = require('./api/mProduct');
var mainLunboAPI = require('./api/mainLunbo');
var navAPI = require('./api/nav');
var userManageAPI = require('./api/userManage');
var sendCodeAPI = require('./api/code');
var cartAPI = require('./api/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nav',nav);
app.use('/secKill',secKill);
app.use('/salePro',salePro);
app.use('/userManage',userManage);
app.use('/mainLunbo',mainLunbo);
app.use('/mProduct',mProduct);
app.use('/category',category);
app.use('/api/secKill',secKillAPI);
app.use('/api/nav',navAPI);
app.use('/api/salePro',saleProAPI);
app.use('/api/userManage',userManageAPI);
app.use('/api/mainLunbo',mainLunboAPI);
app.use('/api/mProduct',mProductAPI);
app.use('/api/code',sendCodeAPI);
app.use('/api/category',categoryAPI);
app.use('/api/cart',cartAPI);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
