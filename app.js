var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    users = require('./routes/users'),
    app = express(),
    log4js = require('log4js');
var log = require('./module/logHelper');
log.use(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser("sessiontest"));
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 10
    },
    rolling: true //过期时间往后退
}));
// 使用该中间件来重置cookie过期时间
// 当用户每次点击页面时
app.use(function(req, res, next) {
    log.helper.writeInfo("中间件")
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;

    //注销session
    destroy(req);
    next(err);
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    //注销session
    destroy(req);
    res.render('error');
});

//注销session
function destroy(req) {
    if (req.session != null) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            }
        })
    }



}
module.exports = app;
