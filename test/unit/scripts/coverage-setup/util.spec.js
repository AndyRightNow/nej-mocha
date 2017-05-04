/* global describe, it */
/* eslint no-unused-expressions:off */

var expect = require('chai').expect
var util = require('./../../../../src/scripts/coverage-setup/util')
var instrumenter = new (require('istanbul').Instrumenter)()

describe('src/scripts/coverage-setup/util', () => {
  describe('Function getFunctionName', () => {
    it('should return the function name', () => {
      function fn (a, b, c) {
        return a + b + c
      }

      expect(util.getFunctionName(fn.toString())).to.equal('fn')
    })
  })
  describe('Function instrumentFunction', () => {
    it('should instrument the function and keep the function intact', () => {
      function fn (a, b, c) {
        /* nej-mocha-cover */
        return a + b + c
      }

      var newFn = util.instrumentFunction(fn, instrumenter)
      console.log(newFn.toString())
      expect(newFn(1, 1, 1)).to.equal(3)
    })
  })
})
