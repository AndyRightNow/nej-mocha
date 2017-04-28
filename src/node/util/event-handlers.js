var util = require('./index')
var consoleForwardHanlders = require('./console-forward-handlers')

function consoleEventHandler (userConfig, cb) {
  return function () {
    var args = Array.from(arguments)
    var type = args[0]
    args = args.slice(1)

    if (type === 'log') {
      consoleForwardHanlders.consoleLogForwardHandler(args)
    } else if (type === 'warn') {
      consoleForwardHanlders.consoleWarnForwardHandler(userConfig, args, function () {
        cb()
      })
    }
  }
}

function pageEventHandler (cb) {
  return function (type, message, stack) {
    if (type === 'error') {
      util.printRed('  ' + message)
      util.printRed('  ' + stack)

      cb()
    }
  }
}

module.exports = {
  consoleEventHandler,
  pageEventHandler
}
