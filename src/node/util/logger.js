var chalk = require('chalk')

function log (level, colorFn, message) {
  console.log(
    colorFn(level + ': '),
    message
  )
}

var logger = {
  info: log.bind(null, 'info', chalk.blue.bind(chalk)),
  warn: log.bind(null, 'warn', chalk.yellow.bind(chalk)),
  debug: log.bind(null, 'debug', chalk.magenta.bind(chalk)),
  error: log.bind(null, 'error', chalk.red.bind(chalk))
}

module.exports = logger
