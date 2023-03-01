var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var ordersRoute = require('./routes/ordersRoute');
var booksRouter = require('./routes/booksRoute');
var authorsRouter = require('./routes/authorsRoute');

const bookApiRouter = require('./routes/bookApiRoute')
const userApiRouter = require('./routes/userApiRoute')
const orderApiRouter = require('./routes/orderApiRoute')
const authorApiRouter = require('./routes/authorApiRoute')

const sequelizeInit = require('./config/sequelize/init')
sequelizeInit().catch(err => {
  console.log(err)
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/order', ordersRoute);
app.use('/book', booksRouter);
app.use('/author', authorsRouter);

app.use('/api/book', bookApiRouter);
app.use('/api/order', orderApiRouter);
app.use('/api/user', userApiRouter);
app.use('/api/author', authorApiRouter);

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
