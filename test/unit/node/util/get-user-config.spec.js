var expect = require('chai').expect;
var getUserConfig = require('./../../../../src/node/util/get-user-config');

describe('src/node/util/get-user-config', () => {

    describe('If no path is given', () => {
        it('should return an object from nej-mocha.conf.js', () => {
            expect(getUserConfig()).to.be.a("Object");
        });

    });

});