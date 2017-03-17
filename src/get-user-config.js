const chalk = require('chalk');

const config = require('./../config');

var userConfig;
const isWin = /^win/.test(process.platform);

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

// Normalize chromePath
if (!userConfig.chromePath) {
    console.log(chalk.red(`  Please provide correct chrome binary absolute path in the configuration file.`));
    process.exit(0);
}
else if (isWin && !/\:[\/\\]/.test(userConfig.chromePath)) {
    console.log(chalk.red(`  Please provide correct Windows chrome binary absolute path in the configuration file.`));
    process.exit(0);
}
userConfig.chromePath = userConfig.chromePath.replace(/[\"\'"]/g, "");

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
let nejPathAliases = userConfig.nejPathAliases;
for (const alias in nejPathAliases) {
    if (nejPathAliases.hasOwnProperty(alias)) {
        nejPathAliases[alias] = `${nejPathAliases[alias]}/`.replace(/[\\\/]+/g, '/');
    }
}

// Normalize testRunnerPort
userConfig.testRunnerPort = isNaN(parseInt(userConfig.testRunnerPort)) ? config.DEFAULT_PORT : parseInt(userConfig.testRunnerPort);

// Normalize proxy
userConfig.proxy = typeof userConfig.proxy === "object" ? userConfig.proxy : {};
userConfig.proxy.port = isNaN(parseInt(userConfig.proxy.port)) ? userConfig.testRunnerPort : parseInt(userConfig.proxy.port);
userConfig.proxy.host = (userConfig.proxy.host || 'localhost').toString().trim();

// Normalize shouldBrowserClosed
userConfig.shouldBrowserClosed = userConfig.shouldBrowserClosed === undefined ? true : Boolean(userConfig.shouldBrowserClosed);

// Normalize headless
userConfig.headless = userConfig.headless === undefined ? true : Boolean(userConfig.headless);

// Normalize maxRetries
userConfig.maxRetries = isNaN(parseInt(userConfig.maxRetries)) ? 5 : parseInt(userConfig.maxRetries);

module.exports = userConfig;