var path = require('path');
var config = require('./../../shared/config');
var normalizeUserConfig = require('./normalize-user-config');

var defaultConfPath = path.resolve(process.cwd(), config.CONSTANT.DEFAULT_CONFIG_FILENAME.CONF);
var defaultConfigPath = path.resolve(process.cwd(), config.CONSTANT.DEFAULT_CONFIG_FILENAME.CONFIG);

function getUserConfig(path) {
	path = path || defaultConfPath;

	var userConfig;
	try {
		userConfig = require(path);
	} catch (e) {
		try {
			userConfig = require(defaultConfPath);
		} catch (e) {
			try {
				userConfig = require(defaultConfigPath);
			} catch (e) {
				throw new Error(
					'Invalid config path. Neither nej-mocha.conf.js nor nej-mocha.config.js is found under your current working directory. '
				);
			}
		}
	}

	userConfig = normalizeUserConfig(userConfig);

	return userConfig;
}

module.exports = getUserConfig;
