var util = require('./index');
var config = require('./../../shared/config');
var normalizeSlashes = util.normalizeSlashes;

function normalizeUserConfig(userConfig) {
    // Normalize globals
    userConfig.globals = userConfig.globals || {};

    // Normalize entries
    userConfig.entries = (userConfig.entries && (typeof userConfig.entries === 'string' ? [userConfig.entries] : userConfig.entries)) || [config.CONSTANT.DEFAULT_TEST_ENTRY];
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
    userConfig.nejPathAliases.pro = userConfig.nejPathAliases.pro || config.CONSTANT.DEFAULT_NEJ_PRO;
    let nejPathAliases = userConfig.nejPathAliases;
    for (var alias in nejPathAliases) {
        if (nejPathAliases.hasOwnProperty(alias)) {
            nejPathAliases[alias] = normalizeSlashes(`${nejPathAliases[alias]}/`);
        }
    }

    // Normalize testRunnerPort
    userConfig.testRunnerPort = isNaN(parseInt(userConfig.testRunnerPort)) ? config.CONSTANT.DEFAULT_PORT : parseInt(userConfig.testRunnerPort);

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

    // Normalize coverage
    userConfig.coverage = userConfig.coverage || false;

    // Normalize coverageOptions
    userConfig.coverageOptions = userConfig.coverageOptions || {};
    userConfig.coverageOptions.reporters = (userConfig.coverageOptions.reporters || ['text']) && (!Array.isArray(userConfig.coverageOptions.reporters) ? [userConfig.coverageOptions.reporters] : userConfig.coverageOptions.reporters);

    //Normalize inject
    userConfig.inject = (userConfig.inject && Array.isArray(userConfig.inject) && userConfig.inject) || [];

    for (let injection of userConfig.inject) {
        if (typeof injection !== 'object') {
            userConfig.inject = [];
            break;
        } else {
            injection.pattern = injection.pattern && injection.pattern.source ? injection.pattern.source : ((injection.pattern && typeof injection.pattern === 'string' && injection.pattern) || "")
            injection.path = (injection.path && typeof injection.path === 'string' && injection.path) || "";
        }
    }
}

module.exports = normalizeUserConfig;