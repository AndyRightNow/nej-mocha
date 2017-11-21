var logger = require('./logger')

function bindExitHandlers (finish) {
  process
    .on('exit', finish.bind(null, 'exit'))
    .on('SIGINT', finish.bind(null, 'SIGINT'))

  if (process.platform === 'win32') {
    var readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.on('SIGINT', function () {
      if (process.env.NODE_ENV === 'test') {
        logger.debug('on receiving SIGINT')
      }
      process.exit()
    })

    readline.on('SIGTSTP', function () {
      if (process.env.NODE_ENV === 'test') {
        logger.debug('on receiving SIGTSTP')
      }
      process.exit()
    })
  }
}

module.exports = {
  bindExitHandlers
}
