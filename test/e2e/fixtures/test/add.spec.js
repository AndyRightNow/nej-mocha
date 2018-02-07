/* global NEJ, describe, it, expect */

NEJ.define(['{pro}/add.js'], add => {
    describe('Function add', () => {
        it('should return 2 if adding 1 and 1', () => {
            expect(add(1, 1)).to.equal(2);
        });
    });
});
