/* global describe, it */
/* eslint no-unused-expressions: off */

var expect = require('chai').expect;

var helpers = require('./../../../../src/node/util/get-all-specs').helpers;

describe('src/node/get-all-specs', () => {
    describe('Helpers', () => {
        describe('normalizePaths', () => {
            it('should leave only relative .js files', () => {
                var files = helpers.normalizePaths(
                    [
                        'c:/test/dir/test',
                        'c:/test/dir/test/test.js',
                        'c:/test/dir/test/test.py',
                        'c:/test/dir/test/test/test/test/test.js',
                    ],
                    'c:/test/dir/'
                );

                expect(
                    files.every(function(val) {
                        return /^\.\//.test(val) && /\.js$/.test(val);
                    })
                ).to.be.true;
            });
        });
    });
});
