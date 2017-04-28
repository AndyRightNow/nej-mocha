/* global NEJ, dependencyInjectionArr */

var util = require('./util')
var Instrumenter = require('./../../../node_modules/istanbul/lib/instrumenter')
require('./../../../node_modules/esprima/dist/esprima.js')

function coverageSetup () {
  var originalDefine = NEJ.define
  var instrumenter = new Instrumenter()
  /* eslint no-undef:off */
  NEJ.define = define = function () {
    var uri, deps, cb

    switch (arguments.length) {
      case 1:
        cb = arguments[0]
        break
      case 2:
        deps = arguments[0]
        cb = arguments[1]
        break
      case 3:
        uri = arguments[0]
        deps = arguments[1]
        cb = arguments[2]
        break
      default:
        return
    }

    util.instrumentFunction(cb, instrumenter)
    util.applyInjections(cb, deps, dependencyInjectionArr)

    originalDefine.apply(NEJ, uri ? [uri, deps, cb] : [deps, cb])
  }
}

module.exports = coverageSetup
