var config = require('./../../shared/config');

var noop = () => true;

var functionStrRE = /^(function)?(.|[\r\n])*?(=>)?(.|[\r\n])*?\{/;

function getFunctionCode(fnStr) {
	return fnStr.replace(functionStrRE, '').replace(/\}$/, '');
}

function getFunctionArgs(fnStr) {
	return fnStr
		.match(functionStrRE)[0]
		.match(/\((.|[\r\n])*\)/)[0]
		.replace(/[()]/g, '')
		.replace(/\/\/.*/g, '')
		.replace(/\/\*(.|[\r\n])*\*\//g, '')
		.replace(/[\s\r\n]/g, '')
		.split(',');
}

function instrumentFunction(fn, instrumenter, filePath) {
	fn = fn || noop;
	var fnStr = fn.toString();
	var includeRE = /./;
	var excludeRE = /./;

	try {
		includeRE =
			window.userConfig.coverageOptions &&
			window.userConfig.coverageOptions.include &&
			new RegExp(
				window.userConfig.coverageOptions.include.source,
				window.userConfig.coverageOptions.include.flags
			);
		excludeRE =
			window.userConfig.coverageOptions &&
			window.userConfig.coverageOptions.exclude &&
			new RegExp(
				window.userConfig.coverageOptions.exclude.source,
				window.userConfig.coverageOptions.exclude.flags
			);
	} catch (error) {
		console.error(error);
	}

	if (
		!window.userConfig.coverage ||
		new RegExp(config.CONSTANT.COVERAGE_IGNORE_IDENTIFIER).test(fnStr)
	) {
		return;
	}

	if (
		new RegExp(config.CONSTANT.COVERAGE_IDENTIFIER).test(fnStr) ||
		(!excludeRE.test(filePath) && includeRE.test(filePath))
	) {
		var fnCode;
		var fnArgs;

		try {
			fnCode = getFunctionCode(fnStr);
			fnArgs = getFunctionArgs(fnStr);
		} catch (error) {
			console.error(error);
			return;
		}

		fnCode = instrumenter.instrumentSync(fnCode, filePath);
		/* eslint no-new-func:off */
		return new Function(...fnArgs.concat([fnCode]));
	}
}

function applyInjections(fn, deps, dependencyInjectionArr) {
	fn = fn || noop;
	var fnStr = fn.toString();

	if (new RegExp(config.CONSTANT.INJECT_IDENTIFIER).test(fnStr)) {
		var isNew = {};
		dependencyInjectionArr.forEach(d => (isNew[d.path] = true));

		for (var injection of dependencyInjectionArr) {
			var pattern = injection.pattern ? new RegExp(injection.pattern) : null;

			if (pattern instanceof RegExp) {
				for (var i = 0, l = deps.length; i < l; i++) {
					if (pattern.test(deps[i]) && !isNew[deps[i]]) {
						deps[i] = injection.path;
					}
				}
			}
		}
	}
}

module.exports = {
	getFunctionCode,
	getFunctionArgs,
	instrumentFunction,
	applyInjections,
};
