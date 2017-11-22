const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routesIndex = require('./routes/index');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routesIndex);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // const message = req.app.get('env') === 'development' ? err : {};
  const statusCode = err.status || 500;
  if (err.statusMessage) {
    res.statusMessage = err.statusMessage;
  }
  err = err.errors ? err.errors[0] : err;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(statusCode);
  res.json({
    errorStatus: statusCode,
    message: err.message,
  });
});
/* eslint-enable no-unused-vars */

module.exports = app;
