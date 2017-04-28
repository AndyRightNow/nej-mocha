var generateCoverage = require('./generate-coverage');
var config = require('./../../shared/config');
var util = require('./index');

function consoleLogForwardHandler(args) {
    var content = args.join('');

    if (!/^do|circular|alternately/.test(content)) {
        let results = args.map(function (v) {
            return typeof v === 'string' ? v.replace('✓', '\u221A').replace('✖', '\u00D7').replace('․', '.') : v.toString();
        }).filter(function (v) {
            return !/stdout\:/.test(v)
        });

        console.log.apply(console, results);
    }
}

var consoleWarnForwardHandler = (function () {
    var doneFlag = false;
    var coverageFlag = false;

    return function (userConfig, args, cb) {
        var content = args.join('');

        if (new RegExp(config.CONSTANT.MOCHA_DONE_SIGNAL).test(content)) {
            doneFlag = true;

            if (coverageFlag && doneFlag) {
                cb();
            }
        } else if (new RegExp(config.CONSTANT.HAS_COVERAGE_SIGNAL).test(content)) {
            var coverage = JSON.parse(args[1]);
            coverageFlag = true;

            if (userConfig.coverage) {
                generateCoverage(userConfig, coverage, function (err) {
                    if (err) {
                        util.printRed('  ' + err);
                    }

                    if (doneFlag) {
                        cb();
                    }
                });
            } else {
                if (doneFlag) {
                    cb();
                }
            }
        }
    }
})();

module.exports = {
    consoleLogForwardHandler,
    consoleWarnForwardHandler
}