module.exports = {
	entries: [
		'./test/e2e/fixtures/test/conditional-add.spec.js',
		'./test/e2e/fixtures/test/add.spec.js',
		'./test/e2e/fixtures/test/sub.spec.js',
	],
	__DEV_TEST__: true,
	nejPathAliases: {
		pro: 'test/e2e/fixtures/src/',
	},
	mochaOptions: {
		timeout: 110000,
		useColors: true,
		reporter: 'spec',
	},
	testRunnerPort: 8114,
	shouldBrowserClosed: true,
	headless: true,
	coverage: true,
	coverageOptions: {
		reporters: ['lcov', 'text'],
		include: /fixtures.*?test/,
		exclude: /nej/,
	},
};
