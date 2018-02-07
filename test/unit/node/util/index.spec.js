/* global describe, it */

var expect = require('chai').expect;
var util = require('./../../../../src/node/util');

describe('src/node/util/index', () => {
    describe('Function normalizeDir', () => {
        describe('If the dir does not contain .js', () => {
            it('should append **/**/*.js to it', () => {
                expect(/\*\*[/\\]+\*\*[/\\]+\*\.js/.test(util.normalizeDir('./test/dir'))).to.be
                    .true;
            });
        });

        describe('Else', () => {
            it('should return the original dir', () => {
                var dir = './dir.js';

                expect(util.normalizeDir(dir)).to.equal(dir);
            });
        });
    });

    describe('Function walkSync', () => {
        describe('Run through', () => {
            it('should have no errors', () => {
                expect(util.walkSync('./dummy').length).to.equal(0);
            });
        });
    });

    describe('Function normalizeSlashes', () => {
        describe('After normalization', () => {
            it('should not contain backslash', () => {
                var norm = util.normalizeSlashes('///\\\\///////\\/\\/\\//');

                expect(/\\/.test(norm)).to.be.false;
            });
        });
    });

    describe('Function normalizeCliOptionValue', () => {
        it('should return true and false', () => {
            expect(util.normalizeCliOptionValue('true')).to.be.true;
            expect(util.normalizeCliOptionValue('false')).to.be.false;
        });

        it('should return numbers', () => {
            expect(util.normalizeCliOptionValue('1')).to.equal(1);
            expect(util.normalizeCliOptionValue('2')).to.equal(2);
        });

        it('should return strings', () => {
            expect(util.normalizeCliOptionValue('x')).to.equal('x');
        });

        it('should return null', () => {
            expect(util.normalizeCliOptionValue('null')).to.be.null;
        });

        it('should return undefined', () => {
            expect(util.normalizeCliOptionValue('undefined')).to.be.undefined;
        });
    });

    describe('Function getErrorOutput', () => {
        it('should compose the error info with the indent', () => {
            var err = {
                details: 'details',
                message: 'msg',
                stack: 'some stack',
                url: 'url',
            };

            var ret = util.getErrorOutput(err, '  ');

            expect(ret.match(/[\n\r]/g).length).to.be.greaterThan(7);
        });

        it('should compose the partial error info with the indent', () => {
            var err = {
                details: 'details',
                message: 'msg',
            };

            var ret = util.getErrorOutput(err, '  ');

            expect(ret.match(/[\n]/g).length).to.be.lessThan(3);
        });
    });
});
