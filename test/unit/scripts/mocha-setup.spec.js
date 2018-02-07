/* global describe, it */
/* eslint no-unused-expressions: off */

var expect = require('chai').expect;
var mochaSetup = require('./../../../src/scripts/mocha-setup');

describe('src/scripts/mocha-setup', () => {
    it('should setup the given options', () => {
        let options = {};
        function fn(key, val) {
            options[key] = val;
        }
        let mocha = {
            ui: fn.bind(null, 'ui'),
            test: fn.bind(null, 'test'),
            useColors: fn.bind(null, 'useColors'),
        };
        mochaSetup(mocha, {
            test: 1,
            useColors: true,
        });

        expect(options.ui).to.equal('bdd');
        expect(options.test).to.equal(1);
        expect(options.useColors).to.be.true;
    });
});
