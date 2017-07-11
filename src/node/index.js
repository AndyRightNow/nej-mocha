var _ = require('lodash')
var path = require('path')
var Nightmare = require('nightmare')
var createServer = require('./server')
var config = require('./../shared/config')
var getUserConfig = require('./util/get-user-config')
var normalizeUserConfig = require('./util/normalize-user-config')
var util = require('./util')
var eventHandlers = require('./util/event-handlers')

function run (options, callback) {
  var userConfig

  try {
    userConfig = getUserConfig()
  } catch (e) {
    userConfig = {}
  }

  callback = callback || util.noop
  if (options) {
    var optionsConfig = options.config

    if (optionsConfig) {
      if (typeof optionsConfig === 'string') {
        try {
          userConfig = getUserConfig(path.resolve(process.cwd(), optionsConfig))
        } catch (error) {
          callback(error)
          return
        }
      } else if (typeof optionsConfig === 'object') {
        userConfig = normalizeUserConfig(_.merge(userConfig, options.config || {}))
      }
    }

    this.userConfig = userConfig
  }

  var addr = 'http://localhost:' + userConfig.testRunnerPort + '/' + config.CONSTANT.TEST_INDEX

  var nightmare = Nightmare({
    show: !userConfig.headless
  })

  var finish = util.finish.bind(null, userConfig.shouldBrowserClosed)

  var runningServer = createServer(userConfig).listen(userConfig.testRunnerPort, function () {
    finish = finish.bind(null, runningServer, nightmare, callback)

    console.log('  Test server is running on ' + userConfig.testRunnerPort)
    console.log('  Tests are starting...')

    nightmare
      .viewport(1024, 768)
      .on('page', eventHandlers.pageEventHandler(finish))
      .on('console', eventHandlers.consoleEventHandler(userConfig, finish))
      .goto(addr)
      .catch(function (err) {
        util.printRed(util.getErrorOutput(err, '  '))

        finish(err)
      })
  })
}

module.exports = {
  run
}
