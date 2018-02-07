/* global NEJ, describe, it, expect */
/* eslint no-unused-expressions:off */

NEJ.define(['{pro}/conditional-add.js'], conditionalAdd => {
    describe('Function conditionalAdd', () => {
        it('should return undefined if adding 1 and 0', () => {
            expect(conditionalAdd(1, 0)).to.be.undefined;
        });
        it('should return 2 if adding 1 and 1', () => {
            expect(conditionalAdd(1, 1)).to.equal(2);
        });
    });
});
