var config = require('./../../shared/config');
var normalizeUserConfig = require('./normalize-user-config');

var userConfig;

try {
    userConfig = require(config.CONSTANT.DEFAULT_CONFIG_PATH.CONF);
} catch (e) {
    try {
        userConfig = require(config.CONSTANT.DEFAULT_CONFIG_PATH.CONFIG);
    } catch (e) {
        userConfig = {};
    }
}

normalizeUserConfig(userConfig);

module.exports = userConfig;