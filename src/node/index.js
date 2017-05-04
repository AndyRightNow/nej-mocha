var _ = require('lodash')
var path = require('path')
var Nightmare = require('nightmare')
var createServer = require('./server')
var config = require('./../shared/config')
var getUserConfig = require('./util/get-user-config')
var util = require('./util')
var eventHandlers = require('./util/event-handlers')
var userConfig = getUserConfig()

function run (options, callback) {
  callback = callback || util.noop
  if (options) {
    var optionsConfig = options.config

    if (optionsConfig) {
      if (typeof optionsConfig === 'string') {
        userConfig = getUserConfig(path.resolve(process.cwd(), optionsConfig))
      } else if (typeof optionsConfig === 'object') {
        userConfig = _.merge(userConfig, options.config || {})
      }
    }
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
        util.printRed('  ' + err)

        finish(err)
      })
  })
}

module.exports = {
  run
}
