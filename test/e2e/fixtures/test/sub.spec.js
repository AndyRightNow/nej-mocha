/* global define, describe, it, expect */

define([
  '{pro}/sub.js'
], (sub) => {
  describe('Function sub', () => {
    it('should return 0 if subing 1 and 1', () => {
      expect(sub(1, 1)).to.equal(0)
    })
  })
})
