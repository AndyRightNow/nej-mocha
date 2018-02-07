/* global describe, it, before */

var expect = require('chai').expect;
var config = require('./../../../../src/shared/config');
var helpers = require('./../../../../src/node/util/normalize-user-config').helpers;

describe('src/node/util/normalize-user-config', () => {
	describe('Helper functions', () => {
		var userConfig = {};

		describe('normalizeGlobals', () => {
			it('should set globals to an empty object if not set', () => {
				helpers.normalizeGlobals(userConfig);

				expect(Object.keys(userConfig.globals).length).to.equal(0);
			});
		});

		describe('normalizeEntries', () => {
			describe('If no entries are given', () => {
				it('should set entries to an array of default entry', () => {
					helpers.normalizeEntries(userConfig);

					expect(userConfig.entries[0]).to.equal(config.CONSTANT.DEFAULT_TEST_ENTRY);
				});
			});

			describe('If a string is given', () => {
				it('should set the entries to array of given string', () => {
					userConfig.entries = './str';
					helpers.normalizeEntries(userConfig);

					expect(userConfig.entries[0]).to.equal('./str');
				});
			});

			describe('If an array is given', () => {
				it('should add ./ to every path given', () => {
					userConfig.entries = ['str', '/path'];
					helpers.normalizeEntries(userConfig);

					userConfig.entries.forEach(function(val, i) {
						expect(userConfig.entries[i]).to.contain('./');
					});
				});
			});
		});

		describe('normalizeMochaOptions', () => {
			describe('If no mochaOptions is given', () => {
				it('should set timeout to 3000, reporter to spec and useColors to true', () => {
					helpers.normalizeMochaOptions(userConfig);

					expect(userConfig.mochaOptions.useColors).to.be.true;
					expect(userConfig.mochaOptions.timeout).to.equal(3000);
					expect(userConfig.mochaOptions.reporter).to.equal('spec');
				});
			});
		});

		describe('normalizeNejPathAliases', () => {
			describe('If nothing is given', () => {
				it('should set pro to default and append a slash to it', () => {
					helpers.normalizeNejPathAliases(userConfig);

					expect(userConfig.nejPathAliases.pro).to.equal(
						config.CONSTANT.DEFAULT_NEJ_PRO + '/'
					);
				});
			});
		});

		describe('normalizeProxy', () => {
			describe('If nothing is given', () => {
				it('should set it to localhost', () => {
					helpers.normalizeProxy(userConfig);

					expect(userConfig.proxy.host).to.equal('localhost');
				});
			});
		});

		describe('normalizeShouldBrowserClosed', () => {
			describe('If nothing is given', () => {
				it('should set it to true', () => {
					helpers.normalizeShouldBrowserClosed(userConfig);

					expect(userConfig.shouldBrowserClosed).to.be.true;
				});
			});
		});

		describe('normalizeHeadless', () => {
			describe('If nothing is given', () => {
				it('should set it to true', () => {
					helpers.normalizeHeadless(userConfig);

					expect(userConfig.headless).to.be.true;
				});
			});
		});

		describe('normalizeScriptsToInject', () => {
			describe('If paths are relative paths', () => {
				it('should normalize slashes', () => {
					userConfig.normalizeScriptsToInject = ['./test', './..\\test/test'];
					helpers.normalizeScriptsToInject(userConfig);

					expect(/\\/.test(userConfig.scriptsToInject[1])).to.be.false;
				});
			});

			describe('If paths are not relative paths', () => {
				it('should ignore paths', () => {
					userConfig.normalizeScriptsToInject = ['c:/test', 'd:/test'];
					helpers.normalizeScriptsToInject(userConfig);

					expect(userConfig.scriptsToInject.length).to.equal(0);
				});
			});
		});

		describe('normalizeCoverage', () => {
			describe('If nothing is given', () => {
				it('should set it to false', () => {
					helpers.normalizeCoverage(userConfig);

					expect(userConfig.coverage).to.be.false;
				});
			});
		});

		describe('normalizeCoverageOptions', () => {
			describe('If nothing is given', () => {
				before(() => {
					helpers.normalizeCoverageOptions(userConfig);
				});

				it('should set reporter to an array with one element `text`', () => {
					expect(userConfig.coverageOptions.reporters[0]).to.equal('text');
					expect(userConfig.coverageOptions.include).to.be.a('RegExp');
					expect(userConfig.coverageOptions.exclude).to.be.a('RegExp');
				});

				it('should set include and exclude to regular expressions', () => {
					expect(userConfig.coverageOptions.include).to.be.a('RegExp');
					expect(userConfig.coverageOptions.exclude).to.be.a('RegExp');
				});
			});
		});

		describe('normalizeInject', () => {
			describe('If nothing is given', () => {
				it('should set it to an empty array', () => {
					helpers.normalizeInject(userConfig);

					expect(userConfig.inject.length).to.equal(0);
				});
			});

			describe('If elements in the array is not an object', () => {
				it('should set it to an empty array', () => {
					helpers.normalizeInject(userConfig);

					expect(userConfig.inject.length).to.equal(0);
				});
			});

			describe('If elements in the array is an object', () => {
				it('should normalize pattern to strings', () => {
					userConfig.inject = [
						{
							pattern: /test/,
							path: '',
						},
					];
					helpers.normalizeInject(userConfig);

					expect(userConfig.inject[0].pattern).to.equal('test');

					userConfig.inject = [
						{
							pattern: 1,
							path: '',
						},
					];
					helpers.normalizeInject(userConfig);

					expect(userConfig.inject[0].pattern).to.equal('');
				});
			});
		});
	});
});
