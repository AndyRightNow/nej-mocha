const expect = require('chai').expect;

const path = require('path');

const {
    walkSync
} = require('./../src/util');

describe("Utility functions", () => {
    describe("walkSync", () => {
        let walkRes;

        before("Walk through walkSyncTestFolder", () => {
            walkRes = walkSync(path.resolve(__dirname, 'walkSyncTestFolder')).map(p => p.replace(/[\\\/]/g, '/'));
        });

        it("should have correct results", () => {
            let base = path.resolve(__dirname, 'walkSyncTestFolder');
            let expected = [
                path.resolve(base, 'file1'),
                path.resolve(base, 'file2'),
                path.resolve(base, 'folder1', 'file1'),
                path.resolve(base, 'folder2', 'file1'),
            ].map(p => p.replace(/[\\\/]/g, '/'));

            expect(walkRes).to.have.members(expected);
        });
    });
});