/* eslint func-names: 0 */

const express = require('express');
const taunus = require('taunus');
const taunusExpress = require('taunus-express');
// const exphbs = require('express-handlebars');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');
const routes = require('./controllers/routes');

const app = express();

const taunusmainLayout = require('./.bin/views/layouts/main');

taunusExpress(taunus, app, {
	routes: routes,
	layout: taunusmainLayout
});

// uncomment after placing your favicon in /client
// app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.bin/client')));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
