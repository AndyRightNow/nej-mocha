/* global describe, it */
/* eslint no-unused-expressions:off */
var nejMocha = require('./../../../index')
var expect = require('chai').expect

describe('src/node/index', () => {
  describe('Run with config files', () => {
    it('should run with no errors', done => {
      nejMocha.run({
        config: './test/e2e/fixtures/nej-mocha.conf.js'
      }, (err) => {
        expect(err).to.be.undefined
        done()
      })
    })
    
    it('should throw an error if path is invalid', done => {
      nejMocha.run({
        config: './invalid-mocha.conf.js'
      }, (err) => {
        expect(err).to.not.be.undefined
        done()
      })
    })
  })

  describe('Run with config object', () => {
    it('should run with no errors', done => {
      nejMocha.run({
        config: {
          entries: [
            './test/e2e/fixtures/test/**/**/add.spec.js'
          ],
          __DEV_TEST__: true,
          nejPathAliases: {
            pro: 'test/e2e/fixtures/src/'
          },
          mochaOptions: {
            timeout: 110000,
            useColors: true,
            reporter: 'spec'
          },
          testRunnerPort: 8005,
          shouldBrowserClosed: true,
          headless: true,
          coverage: true,
          coverageOptions: {
            reporters: [
              'lcov',
              'text'
            ]
          }
        }
      }, (err) => {
        expect(err).to.be.undefined
        done()
      })
    })
  })
})
