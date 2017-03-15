var userConfig;

try {
    userConfig = require('./../../../nej-mocha.conf.js');
} catch (e) {
    try {
        userConfig = require('./../../../nej-mocha.config.js');
    } catch (e) {
        userConfig = {};
    }
}

// Normalize userConfig

// Normalize globals
userConfig.globals = userConfig.globals || {};

// Normalize testFolder
userConfig.testFolder = userConfig.testFolder || "./test";
userConfig.testFolder = userConfig.testFolder.replace(/[\\\/]+/g, '/');
if (userConfig.testFolder[0] !== '.') {
    if (userConfig.testFolder[0] !== '/') {
        userConfig.testFolder = '/' + userConfig.testFolder;
    }
    userConfig.testFolder = '.' + userConfig.testFolder;
}
// Normalize mochaOptions
userConfig.mochaOptions = userConfig.mochaOptions || {};
userConfig.mochaOptions.timeout = isNaN(parseInt(userConfig.mochaOptions.timeout)) ? 3000 : parseInt(userConfig.mochaOptions.timeout);

// Normalize nejPathAliases
userConfig.nejPathAliases = userConfig.nejPathAliases || {};
userConfig.nejPathAliases.pro = userConfig.nejPathAliases.pro || "src/javascript";
userConfig.nejPathAliases.test = userConfig.nejPathAliases.test || userConfig.testFolder.split('./').splice(-1)[0];

module.exports = userConfig;