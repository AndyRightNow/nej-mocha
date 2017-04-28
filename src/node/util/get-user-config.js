var path = require('path');
var config = require('./../../shared/config');
var util = require('./index');
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
                userConfig = {};
                util.printRed('  Invalid configuration path.');
                process.exit(0);
            }
        }
    }

    normalizeUserConfig(userConfig);

    return userConfig;
}


module.exports = getUserConfig;