const expect = require('chai').expect;

const path = require('path');

const {
    walkSync,
    normalizeSlashes,
    recurForOwn
} = require('./../src/node/util');

describe("Utility functions", () => {
    describe("walkSync", () => {
        let walkRes;

        before("Walk through walkSyncTestFolder", () => {
            walkRes = walkSync(path.resolve(__dirname, 'walkSyncTestFolder')).map(p => p.replace(/[\\\/]+/g, '/'));
        });

        it("should have correct results", () => {
            let base = path.resolve(__dirname, 'walkSyncTestFolder');
            let expected = [
                path.resolve(base, 'file1'),
                path.resolve(base, 'file2'),
                path.resolve(base, 'folder1', 'file1'),
                path.resolve(base, 'folder2', 'file1'),
            ].map(p => p.replace(/[\\\/]+/g, '/'));

            expect(walkRes).to.have.members(expected);
        });
    });

    describe("normalizeSlashes", () => {
        let path = ".///wqwe//\\\qweqwe\\\////qweqwe///qwe/";

        before("Normalize", () => {
            path = normalizeSlashes(path);
        });

        it("should not have backslashes", () => {
            expect(/\\/.test(path)).to.be.false;
        });

        it("should not have extra slashes", () => {
            expect(/\/{2,}/.test(path)).to.be.false;
        });
    });

    describe('recurForOwn', () => {
        let obj = {
            a: {
                line: 0,
                b: {
                    line: 0
                }
            },
            c: {
                d: {
                    line: 0
                }
            }
        };

        it('should change all line to 1', () => {
            recurForOwn(obj, (val, key, o) => {
                if (key === 'line') {
                    o[key] = 1;
                }
            });

            expect(obj.a.line).to.equal(1);
            expect(obj.a.b.line).to.equal(1);
            expect(obj.c.d.line).to.equal(1);
        });
    });
});