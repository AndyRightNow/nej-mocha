module.exports = {
	entries: ['./test/e2e/fixtures/test/**/**/*.spec.js'],
	__DEV_TEST__: true,
	nejPathAliases: {
		pro: 'test/e2e/fixtures/src/',
	},
	mochaOptions: {
		timeout: 110000,
		useColors: true,
		reporter: 'spec',
	},
	testRunnerPort: 8324,
	shouldBrowserClosed: false,
	headless: true,
	coverage: true,
	coverageOptions: {
		reporters: ['lcov', 'text'],
	},
	inject: [
		{
			pattern: 'pro/does/not/exist',
			path: '{pro}/add.js',
		},
	],
};
