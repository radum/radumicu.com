/* eslint func-names: 0 */

var express = require('express');
var taunus = require('taunus');
var taunusExpress = require('taunus-express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');
var routes = require('./controllers/routes');

var app = express();

taunusExpress(taunus, app, {
	routes: routes,
	layout: require('./.public/views/layouts/main')
});

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));

// app.engine('hbs', exphbs({
// 	defaultLayout: __dirname + '/views/layouts/main.hbs',
// 	partialsDir: __dirname + '/views/partials',
// 	layoutsDir: __dirname + '/views/layouts',
// 	extname: 'hbs'
// }));

// app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.public')));

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');

	err.status = 404;

	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
