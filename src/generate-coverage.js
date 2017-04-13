const istanbul = require('istanbul');
const path = require('path');
const fs = require('fs');
const util = require('./util');
const userConfig = require('./get-user-config');

let collector = new istanbul.Collector();
let reporter = new istanbul.Reporter();

module.exports = function generateCoverage(coverage, cb) {
    for (let key in coverage) {
        if (coverage.hasOwnProperty(key)) {
            let newKey = path.resolve(__dirname, `../../../${key}`);
            coverage[newKey] = coverage[key];
            delete coverage[key];
            coverage[newKey].path = newKey;

            let lineCountBefore;

            try {
                 lineCountBefore = fs.readFileSync(path.resolve(newKey)).toString('utf-8').match(/(.|[\s\r\n])*?function(.|[\s\r\n])*?\{[\s\r\n]*/)[0].split(/[\r\n]+/).length - 1;
            }
            catch(err) {
                return cb(err);
            }

            util.recurForOwn(coverage[newKey], (val, key, obj) => {
                if (key === 'line') {
                    obj[key] = val + lineCountBefore;
                }
            });
        }
    }
    collector.add(coverage);

    reporter.addAll(userConfig.coverageOptions.reporters);

    reporter.write(collector, true, function (err) {
        cb(err);
    });
}