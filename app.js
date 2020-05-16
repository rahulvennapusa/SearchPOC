var express = require('express');
var path = require('path');
var app = express();
var Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://a989c64317644dc6a1f24120ac13480d@o393557.ingest.sentry.io/5242850' });

const port = 3000
var mainRouter = require('./router/mainRouter');
var searchRouter = require('./router/searchRouter');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(Sentry.Handlers.requestHandler());
// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', mainRouter);
app.use('/search', searchRouter);
app.use(Sentry.Handlers.errorHandler());

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
  });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        status: err.status,
        message: err.message
    });
});

app.listen(port, () => console.log(`Search app listening at http://localhost:${port}`));

module.exports = app;