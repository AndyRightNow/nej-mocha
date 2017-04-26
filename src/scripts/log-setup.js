function logSetup(console) {
    var originalFn = console.log;

    // So that empty 'console.log()' is captured
    console.log = function () {
        if (!arguments.length) {
            originalFn.call(console, ' ');
        } else {
            originalFn.apply(console, arguments);
        }
    };
}

module.exports = logSetup;