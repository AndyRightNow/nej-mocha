/* global describe, it */
/* eslint no-unused-expressions:off */

var expect = require('chai').expect;
var logSetup = require('./../../../src/scripts/log-setup');

describe('src/scripts/log-setup', () => {
	it('should exit', () => {
		let testConsole = {};

		logSetup(testConsole);

		expect(testConsole.log).to.be.undefined;
	});

	it('should modify the original log method', () => {
		let testConsole = {
			logged: [],
			log: function() {
				this.logged.push.apply(this.logged, arguments);
			},
		};

		logSetup(testConsole);

		testConsole.log();
		testConsole.log(1);

		expect(testConsole.logged[0]).to.equal(' ');
	});
});
