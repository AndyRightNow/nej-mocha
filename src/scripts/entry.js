/* eslint-env browser */

require('mocha');
require('./log-setup')(window.console);
require('./coverage-setup')();

window.globalsInjector = require('./globals-injector');
window.mochaSetup = require('./mocha-setup');
window.expect = require('chai').expect;
window.runTest = require('./run-test');
