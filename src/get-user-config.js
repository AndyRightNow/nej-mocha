const chalk = require('chalk');

const config = require('./../config');
const {
    normalizeSlashes
} = require('./util');

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
} else if (isWin && !/\:[\/\\]/.test(userConfig.chromePath)) {
    console.log(chalk.red(`  Please provide correct Windows chrome binary absolute path in the configuration file.`));
    process.exit(0);
}
userConfig.chromePath = userConfig.chromePath.replace(/[\"\'"]/g, "");

// Normalize globals
userConfig.globals = userConfig.globals || {};

// Normalize entries
userConfig.entries = (userConfig.entries && (typeof userConfig.entries === 'string' ? [userConfig.entries] : userConfig.entries)) || ["./test"];
for (let i = 0, es = userConfig.entries, l = es.length; i < l; i++) {
    es[i] = normalizeSlashes(es[i]);
    if (es[i][0] !== '.') {
        if (es[i][0] !== '/') {
            es[i] = '/' + es[i];
        }
        es[i] = '.' + es[i];
    }
}
// Normalize mochaOptions
userConfig.mochaOptions = userConfig.mochaOptions || {};
userConfig.mochaOptions.timeout = isNaN(parseInt(userConfig.mochaOptions.timeout)) ? 3000 : parseInt(userConfig.mochaOptions.timeout);

// Normalize nejPathAliases
userConfig.nejPathAliases = userConfig.nejPathAliases || {};
userConfig.nejPathAliases.pro = userConfig.nejPathAliases.pro || "src/javascript";
let nejPathAliases = userConfig.nejPathAliases;
for (const alias in nejPathAliases) {
    if (nejPathAliases.hasOwnProperty(alias)) {
        nejPathAliases[alias] = normalizeSlashes(`${nejPathAliases[alias]}/`);
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

// Normalize scriptsToInject
userConfig.scriptsToInject = userConfig.scriptsToInject || [];
let scriptsToInject = userConfig.scriptsToInject;
for (let i = 0, l = scriptsToInject.length, scriptPath; i < l; i++) {
    scriptPath = scriptsToInject[i];

    // Relative (Starts with dots, letters, slashs or backslashs)
    if (/^(\.|[a-zA-Z]|[\\\/])/.test(scriptPath) && !/^http/.test(scriptPath)) {
        scriptsToInject[i] = normalizeSlashes(`./${scriptPath}`).replace(/(\.\/)+/g, './');
    }
    // Not url, invalid path, ignore
    else if (!/^http/.test(scriptPath)) {
        scriptsToInject[i] = "";
    }
}

module.exports = userConfig;