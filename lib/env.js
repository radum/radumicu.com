const nconf = require('nconf');

nconf.use('memory');
nconf.argv();
nconf.env();

nconf.file('defaults', '.env.defaults.json');

// process.env.NODE_ENV = env();

function accessor(key, value) {
	if (arguments.length === 2) {
		return nconf.set(key, value);
	}

	return nconf.get(key);
}

module.exports = accessor;
