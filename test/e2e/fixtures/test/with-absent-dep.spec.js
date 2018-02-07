/* global NEJ, describe, it, expect */

NEJ.define(['{pro}/with-absent-dep.js'], add => {
    describe('Function add from dependency injection', () => {
        it('should return 2 if adding 1 and 1', () => {
            expect(add(1, 1)).to.equal(2);
        });
    });
});
