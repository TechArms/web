/**
 * Configure the Express Web Server
 */
var express = require('express'),
    http = require('http'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieSession = require('cookie-session'),
    app = express();


// configurations
// app.configure(function() {
app.set('port', process.env.PORT || 8884);
app.locals.pretty = true;
// app.use(express.compress());
app.use(compression());
// app.use(express.static(__dirname + '/client', {    maxAge: 2592000}));
app.use(express.static(__dirname + '/client', { }));
// app.use(express.cookieParser());
app.use(cookieParser());
// app.use(express.bodyParser());
app.use(bodyParser());
// app.use(express.methodOverride());
app.use(methodOverride());
// app.use(express.cookieSession({ secret: process.env.COOKIE_SECRET || 'Superdupersecret' }));
app.use(cookieSession({
    secret: process.env.COOKIE_SECRET || 'tEcHaRmS.iN'
}));
// app.router must be used first, before trying to redirect all other calls to index.html
// app.use(app.router);
var router = express.Router({
    caseSensitive: true
});

// This is the fall back for all non-api calls (or incorrect urls) 
// They will be redirected to index.html from where AngularJS will take care of the routing

// app.use(function(req, res) {    
//      res.sendfile(__dirname + '/client/index.html');    
// });

router.get("/", function(req, res) {
        res.sendfile(__dirname + '/client/index.html');
    })
    // });

//Logs each request and processes it
var requestLogger = function(req, res, next) {
    // TODO:: try to log this in a log file
    console.log('Requesting : ' + req.method + ' ' + req.url);
    next();
}

// app.configure('development', function() {
//   app.use(requestLogger);
//  app.use(express.errorHandler());
// });


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // log all requests
    //app.get('reqLog')(req);
    next();
});

//import routes
require('./server/router')(router);

// startup everything
http.createServer(app).listen(app.get('port'), function() {
    console.log('\n\n');
    console.log('-----------------------');
    console.log('Web server listening on port ' + app.get('port'));
    console.log('-----------------------');
})
