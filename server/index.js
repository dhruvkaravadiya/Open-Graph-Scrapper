var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./index.router');

var app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

if(process.env.NODE_ENV === 'test') {
    module.exports = (port) => {
        return app.listen(port || process.env.PORT || 8000);
    };
} else {
    app.listen(process.env.PORT || 8000);
    module.exports = app;
}
