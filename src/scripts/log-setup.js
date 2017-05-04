function logSetup (customConsole) {
  if (!customConsole || !customConsole.log) {
    return
  }

  var originalFn = customConsole.log

  // So that empty 'console.log()' is captured
  customConsole.log = function () {
    if (!arguments.length) {
      originalFn.call(customConsole, ' ')
    } else {
      originalFn.apply(customConsole, arguments)
    }
  }
}

module.exports = logSetup
