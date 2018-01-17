var logger = require('./logger')
var consoleForwardHanlders = require('./console-forward-handlers')

function consoleEventHandler (userConfig, cb) {
  return function () {
    var args = Array.from(arguments)
    var type = args[0]
    args = args.slice(1)

    if (type === 'log') {
      consoleForwardHanlders.consoleLogForwardHandler(args)
    } else if (type === 'warn') {
      consoleForwardHanlders.consoleWarnForwardHandler(userConfig, args, cb)
    }
  }
}

function pageEventHandler (cb) {
  return function (type, message, stack) {
    /* istanbul ignore if */
    if (type === 'error') {
      logger.error(message)
      logger.error(stack)
      var err = new Error(message)
      err.stack = stack

      cb(err)
    }
  }
}

module.exports = {
  consoleEventHandler,
  pageEventHandler
}
