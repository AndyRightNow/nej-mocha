var nejMocha = require('./../../../index');

nejMocha.run(
	{
		config: './test/e2e/fixtures/nej-mocha.conf.js',
	},
	err => {
		if (err) {
			console.error(err);
		}
	}
);
