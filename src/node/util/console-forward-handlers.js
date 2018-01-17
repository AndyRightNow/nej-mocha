var generateCoverage = require('./generate-coverage')
var config = require('./../../shared/config')
var util = require('./index')
var logger = require('./logger')

function consoleLogForwardHandler (args) {
  var content = args.join('')

  if (!/^do|circular|alternately/.test(content)) {
    var results = args.map(function (v) {
      return typeof v === 'string' ? v.replace('✓', '\u221A').replace('✖', '\u00D7').replace('․', '.') : (v && v.toString()) || ''
    }).filter(function (v) {
      return !/stdout:/.test(v)
    })

    console.log.apply(console, results)
  }
}

var consoleWarnForwardHandler = (function () {
  var doneFlag = false
  var coverageFlag = false
  var testResultError

  function resetFlags () {
    doneFlag = false
    coverageFlag = false
  }

  return function (userConfig, args, cb) {
    var content = args.join('')

    if (new RegExp(config.CONSTANT.MOCHA_DONE_SIGNAL).test(content)) {
      doneFlag = true
      testResultError = parseInt(args[1], 10) || undefined

      if (coverageFlag && doneFlag) {
        cb(testResultError)
        resetFlags()
      }
    } else if (new RegExp(config.CONSTANT.HAS_COVERAGE_SIGNAL).test(content)) {
      coverageFlag = true
      var coverage = JSON.parse(args[1])

      if (userConfig.coverage) {
        generateCoverage(userConfig, coverage, function (err) {
          /* istanbul ignore if */
          if (err) {
            logger.error(util.getErrorOutput(err, '  '))
            cb(err)
            resetFlags()
            return
          }
          /* istanbul ignore if */
          if (doneFlag) {
            cb(testResultError)
            resetFlags()
          }
        })
      } else {
        /* istanbul ignore if */
        if (doneFlag) {
          cb(testResultError)
          resetFlags()
        }
      }
    }
  }
})()

module.exports = {
  consoleLogForwardHandler,
  consoleWarnForwardHandler
}
