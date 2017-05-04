/* global define, window */
/* eslint no-console:off */
var config = require('./../shared/config')

function runTest (testFiles, mocha) {
  define(testFiles, function () {
    mocha.run(function (err) {
      if (err) {
        console.log(err)
      }

      console.warn(config.CONSTANT.MOCHA_DONE_SIGNAL)
      console.warn(config.CONSTANT.HAS_COVERAGE_SIGNAL, JSON.stringify(window.__coverage__ || {}))
    })
  })
}

module.exports = runTest
