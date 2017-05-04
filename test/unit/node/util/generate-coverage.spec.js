/* global describe, it */

var expect = require('chai').expect
var helpers = require('./../../../../src/node/util/generate-coverage').helpers

describe('src/node/util/generate-coverage', () => {
  describe('Helper functions', () => {
    describe('getLineCountBeforeCallbackFn', () => {
      it('should return the corrent line count', () => {
        var content = `/**
                        * Some head comments
                        */
                        define([
                          "test.js"
                        ], function (
                          test
                        ) {
                          var test = 1;
                        });
                      `

        expect(helpers.getLineCountBeforeCallbackFn(content)).to.equal(8)
      })
    })

    describe('adjustLineNumbers', () => {
      it('should change all line properties and add the number to it', () => {
        var obj = {
          nested: {
            line: 0,
            andnested: {
              andnested: {
                line: 0
              }
            }
          },
          line: 0
        }

        helpers.adjustLineNumbers(obj, 1)

        expect(obj.nested.line).to.equal(1)
        expect(obj.line).to.equal(1)
        expect(obj.nested.andnested.andnested.line).to.equal(1)
      })
    })

    describe('updatePathsToAbsPaths', () => {
      it('should have no errors', () => {
        expect(helpers.updatePathsToAbsPaths({
          '.': {
            path: '.'
          }
        }, '.')).to.equal(process.cwd())
      })
    })
  })
})
