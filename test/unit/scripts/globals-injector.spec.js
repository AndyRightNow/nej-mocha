/* global describe, it */

var expect = require('chai').expect
var globalsInjector = require('./../../../src/scripts/globals-injector.js')

describe('src/scripts/globals-injector', () => {
  it('should copy the given json to the global object', () => {
    let global = {}
    let json = {
      test: 1,
      some: {
        nested: {
          array: [1],
          object: {},
          value: 1
        }
      }
    }

    globalsInjector(JSON.stringify(json), global)

    expect(global.test).to.equal(1)
    expect(global.some.nested.array[0]).to.equal(1)
    expect(global.some.nested.object).to.be.a('object')
    expect(global.some.nested.value).to.equal(1)
  })
})
