var istanbul = require('istanbul');
var path = require('path');
var fs = require('fs');
var traverse = require('traverse');

let collector = new istanbul.Collector();
let reporter = new istanbul.Reporter();

module.exports = function generateCoverage(userConfig, coverage, cb) {
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

            traverse(coverage[newKey]).forEach(function (val) {
                if (this.key && this.key === 'line') {
                    this.update(val + lineCountBefore);
                }
            })
        }
    }
    collector.add(coverage);

    reporter.addAll(userConfig.coverageOptions.reporters);

    reporter.write(collector, true, function (err) {
        cb(err);
    });
}