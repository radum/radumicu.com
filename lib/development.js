var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {colorize: true});

var env = require('./env');
var port = env('PORT');
var hosted = env('NODE_ENV') !== 'development';
var proxyPort = parseInt(port) + 1;

function browserSync () {
	if (hosted) {
		return;
	}

	var browserSync = require('browser-sync');
	var config = {
		open: false,
		notify: false,
		// logLevel: 'silent',
		proxy: 'localhost:' + port,
		port: proxyPort,
		files: ['.public/**/*.js', '.public/**/*.css']
	};

	browserSync(config, browserSyncUp);
}

function browserSyncUp () {
	winston.info('browser-sync proxying app on port %s', proxyPort);
}

module.exports = {
	browserSync: browserSync
};
