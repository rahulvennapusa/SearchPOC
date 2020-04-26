var express = require('express');
var path = require('path');
var app = express();


const port = 3000
var mainRouter = require('./router/mainRouter');
var searchRouter = require('./router/searchRouter');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', mainRouter);
app.use('/search', searchRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status, message: err.message });
});

app.listen(port, () => console.log(`Search app listening at http://localhost:${port}`));

module.exports = app;