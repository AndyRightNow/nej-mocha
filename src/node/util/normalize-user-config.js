var util = require('./index')
var config = require('./../../shared/config')
var normalizeSlashes = util.normalizeSlashes

var DEFAULT_INCLUDE_REGEXP = /\.js$/;
var DEFAULT_EXCLUDE_REGEXP = /\.spec\.js$/;

function normalizeGlobals (userConfig) {
  userConfig.globals = userConfig.globals || {}
}

function normalizeEntries (userConfig) {
  userConfig.entries = (userConfig.entries && (typeof userConfig.entries === 'string' ? [userConfig.entries] : userConfig.entries)) || [config.CONSTANT.DEFAULT_TEST_ENTRY]
  for (var i = 0, es = userConfig.entries, l = es.length; i < l; i++) {
    es[i] = normalizeSlashes(es[i])
    if (es[i][0] !== '.') {
      if (es[i][0] !== '/') {
        es[i] = '/' + es[i]
      }
      es[i] = '.' + es[i]
    }
  }
}

function normalizeMochaOptions (userConfig) {
  userConfig.mochaOptions = userConfig.mochaOptions || {}
  userConfig.mochaOptions.timeout = isNaN(parseInt(userConfig.mochaOptions.timeout)) ? 3000 : parseInt(userConfig.mochaOptions.timeout)
  userConfig.mochaOptions.useColors = userConfig.mochaOptions.useColors === undefined ? true : userConfig.mochaOptions.useColors
  userConfig.mochaOptions.reporter = userConfig.mochaOptions.reporter || 'spec'
}

function normalizeNejPathAliases (userConfig) {
  userConfig.nejPathAliases = userConfig.nejPathAliases || {}
  userConfig.nejPathAliases.pro = userConfig.nejPathAliases.pro || config.CONSTANT.DEFAULT_NEJ_PRO
  var nejPathAliases = userConfig.nejPathAliases
  for (var alias in nejPathAliases) {
    if (nejPathAliases.hasOwnProperty(alias)) {
      nejPathAliases[alias] = normalizeSlashes(`${nejPathAliases[alias]}/`)
    }
  }
}

function normalizeTestRunnerPort (userConfig) {
  userConfig.testRunnerPort = isNaN(parseInt(userConfig.testRunnerPort)) ? config.CONSTANT.DEFAULT_PORT : parseInt(userConfig.testRunnerPort)
}

function normalizeProxy (userConfig) {
  userConfig.proxy = typeof userConfig.proxy === 'object' ? userConfig.proxy : {}
  userConfig.proxy.port = isNaN(parseInt(userConfig.proxy.port)) ? userConfig.testRunnerPort : parseInt(userConfig.proxy.port)
  userConfig.proxy.host = (userConfig.proxy.host || 'localhost').toString().trim()
}

function normalizeShouldBrowserClosed (userConfig) {
  userConfig.shouldBrowserClosed = userConfig.shouldBrowserClosed === undefined ? true : Boolean(userConfig.shouldBrowserClosed)
}

function normalizeHeadless (userConfig) {
  userConfig.headless = userConfig.headless === undefined ? true : Boolean(userConfig.headless)
}

function normalizeScriptsToInject (userConfig) {
  userConfig.scriptsToInject = userConfig.scriptsToInject || []
  var scriptsToInject = userConfig.scriptsToInject
  for (var i = 0, l = scriptsToInject.length, scriptPath; i < l; i++) {
    scriptPath = scriptsToInject[i]

    // Relative (Starts with dots, letters, slashs or backslashs)
    if (/^(\.|[a-zA-Z]|[\\/])/.test(scriptPath) && !/^http/.test(scriptPath)) {
      scriptsToInject[i] = normalizeSlashes(`./${scriptPath}`).replace(/(\.\/)+/g, './')
    // Not url, invalid path, ignore
    } else if (!/^http/.test(scriptPath)) {
      scriptsToInject[i] = ''
    }
  }
}

function normalizeCoverage (userConfig) {
  userConfig.coverage = userConfig.coverage || false
}

function normalizeCoverageOptions (userConfig) {
  userConfig.coverageOptions = userConfig.coverageOptions || {}
  var reporters = userConfig.coverageOptions.reporters
  userConfig.coverageOptions.reporters = reporters || ['text']
  userConfig.coverageOptions.reporters = Array.isArray(reporters) ? reporters : [reporters]
  userConfig.coverageOptions.reporters = userConfig.coverageOptions.reporters.map(function (val) {
    if (typeof val !== 'string') {
      return 'text'
    } else return val
  })
  userConfig.coverageOptions.include = userConfig.coverageOptions.include || DEFAULT_INCLUDE_REGEXP
  userConfig.coverageOptions.exclude = userConfig.coverageOptions.exclude || DEFAULT_EXCLUDE_REGEXP
}

function normalizeInject (userConfig) {
  userConfig.inject = (userConfig.inject && Array.isArray(userConfig.inject) && userConfig.inject) || []

  for (var injection of userConfig.inject) {
    if (typeof injection !== 'object') {
      userConfig.inject = []
      break
    } else {
      injection.pattern = injection.pattern && injection.pattern.source ? injection.pattern.source : ((injection.pattern && typeof injection.pattern === 'string' && injection.pattern) || '')
      injection.path = (injection.path && typeof injection.path === 'string' && injection.path) || ''
    }
  }
}

/* istanbul ignore next */
function normalizeUserConfig (userConfig) {
  userConfig = (typeof userConfig === 'object' && userConfig) || {}

  normalizeGlobals(userConfig)
  normalizeEntries(userConfig)
  normalizeMochaOptions(userConfig)
  normalizeNejPathAliases(userConfig)
  normalizeTestRunnerPort(userConfig)
  normalizeProxy(userConfig)
  normalizeShouldBrowserClosed(userConfig)
  normalizeHeadless(userConfig)
  normalizeScriptsToInject(userConfig)
  normalizeCoverage(userConfig)
  normalizeCoverageOptions(userConfig)
  normalizeInject(userConfig)

  return userConfig
}

module.exports = normalizeUserConfig
module.exports.helpers = {
  normalizeGlobals,
  normalizeEntries,
  normalizeMochaOptions,
  normalizeNejPathAliases,
  normalizeTestRunnerPort,
  normalizeProxy,
  normalizeShouldBrowserClosed,
  normalizeHeadless,
  normalizeScriptsToInject,
  normalizeCoverage,
  normalizeCoverageOptions,
  normalizeInject
}
