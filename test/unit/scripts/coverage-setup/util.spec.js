/* global describe, it */
/* eslint no-unused-expressions:off */

var expect = require('chai').expect
var util = require('./../../../../src/scripts/coverage-setup/util')
var config = require('./../../../../src/shared/config')
var instrumenter = new (require('istanbul').Instrumenter)()

describe('src/scripts/coverage-setup/util', () => {
  describe('Function getFunctionCode', () => {
    it('should get the code body of a stringified function', () => {
      let code = util.getFunctionCode(function () {
        /* eslint-disable no-unused-vars */
        let i = 0
        /* eslint-enable no-unused-vars */
      }.toString())

      expect(code).to.contain('let i = 0')
    })
  })

  describe('Function getFunctionArgs', () => {
    it('should return an array of function arguments', () => {
      /* eslint-disable no-unused-vars */
      let args = util.getFunctionArgs(function (arg1, arg2, arg3) {
        let i = 0
        /* eslint-enable no-unused-vars */
      }.toString())

      expect(args).to.include.members(['arg1', 'arg2', 'arg3'])
    })
  })

  describe('Function instrumentFunction', () => {
    it('should instrument the function and keep the function intact', () => {
      function fn (a, b, c) {
        /* nej-mocha-cover */
        return a + b + c
      }

      var newFn = util.instrumentFunction(fn, instrumenter)
      expect(newFn(1, 1, 1)).to.equal(3)
    })
  })

  describe('Function applyInjections', () => {
    it('should replace the literally matched paths with the new paths', () => {
      let arr = [{
        pattern: 'some/literal/path',
        path: 'some/new/path'
      }]
      let deps = [
        'some/literal/path'
      ]
      util.applyInjections(config.CONSTANT.INJECT_IDENTIFIER, deps, arr)
      expect(deps[0]).to.equal(arr[0].path)
    })
    
    it('should replace the paths matched by regex with the new paths', () => {
      let arr = [{
        pattern: /some\/.*?\/path/,
        path: 'some/new/path'
      }]
      let deps = [
        'some/literal/path'
      ]
      util.applyInjections(config.CONSTANT.INJECT_IDENTIFIER, deps, arr)
      expect(deps[0]).to.equal(arr[0].path)
    })
  })
})
