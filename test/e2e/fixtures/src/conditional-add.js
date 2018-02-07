/* global NEJ */

NEJ.define([], function() {
	/* nej-mocha-cover */
	return function conditionalAdd(a, b) {
		if (!a || !b) {
			return;
		}

		return a + b;
	};
});
