/* eslint-disable global-require */

const winston = require('winston');
const env = require('./env');
const port = env('PORT');
const hosted = env('NODE_ENV') !== 'development';
const proxyPort = parseInt(port, 10) + 1;

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { colorize: true });

function browserSyncUp() {
	winston.info('browser-sync proxying app on port %s', proxyPort);
}

function browserSync() {
	if (hosted) {
		return;
	}

	const browserSyncSrv = require('browser-sync');
	const config = {
		open: false,
		notify: false,
		// logLevel: 'silent',
		proxy: 'localhost:' + port,
		port: proxyPort,
		files: ['.bin/public/**/*.js', '.bin/public/**/*.css']
	};

	browserSyncSrv(config, browserSyncUp);
}

module.exports = {
	browserSync: browserSync
};
