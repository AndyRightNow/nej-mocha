/* global window */
var config = require('./../../shared/config')

var noop = () => true

function getFilePath () {
  var ua = (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.toLowerCase()) || ''

  if (ua && !/chrome/.test(ua)) {
    console.error('Please run the test index page in chromium browsers. Other browsers are currently not supported.')
    return
  }

  return new Error().stack.match(/(at.*)/g)[1].replace('at ', '').replace(/:\d+:\d+$/, '').replace(/^http:\/\/.*?\//, '')
}

function getFunctionCode (fnStr) {
  return fnStr.replace(/^function(.|[\r\n])*?\{[\s\r\n]*/, '').replace(/\}$/, '')
}

function getFunctionArgs (fnStr) {
  return fnStr.match(/^function(.|[\r\n])*?\{/)[0].match(/\((.|[\r\n])*\)/)[0].replace(/[()]/g, '').replace(/\/\/.*/g, '').replace(/\/\*(.|[\r\n])*\*\//g, '').replace(/[\s\r\n]/g, '').split(',')
}

function instrumentFunction (fn, instrumenter) {
  fn = fn || noop
  var fnStr = fn.toString()
  var filePath = getFilePath()

  if (new RegExp(config.CONSTANT.COVERAGE_IDENTIFIER).test(fnStr)) {
    var fnCode = getFunctionCode(fnStr)
    var fnArgs = getFunctionArgs(fnStr)

    fnCode = instrumenter.instrumentSync(fnCode, filePath)
    /* eslint no-new-func:off */
    return new Function(...fnArgs.concat([fnCode]))
  }
}

function applyInjections (fn, deps, dependencyInjectionArr) {
  fn = fn || noop
  var fnStr = fn.toString()

  if (new RegExp(config.CONSTANT.INJECT_IDENTIFIER).test(fnStr)) {
    var isNew = {}
    dependencyInjectionArr.forEach(d => (isNew[d.path] = true))

    for (var injection of dependencyInjectionArr) {
      var pattern = injection.pattern ? new RegExp(injection.pattern) : null

      if (pattern instanceof RegExp) {
        for (var i = 0, l = deps.length; i < l; i++) {
          if (pattern.test(deps[i]) && !isNew[deps[i]]) {
            deps[i] = injection.path
          }
        }
      }
    }
  }
}

module.exports = {
  getFilePath,
  getFunctionCode,
  getFunctionArgs,
  instrumentFunction,
  applyInjections
}
