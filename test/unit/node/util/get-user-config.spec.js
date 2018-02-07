/* global describe, it */

var expect = require('chai').expect;
var getUserConfig = require('./../../../../src/node/util/get-user-config');

describe('src/node/util/get-user-config', () => {
	describe('If no path is given', () => {
		it('should throw an error', () => {
			try {
				getUserConfig();
			} catch (error) {
				expect(error).to.not.be.undefined;
			}
		});
	});
});
