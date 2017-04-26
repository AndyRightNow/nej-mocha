var path = require('path');

var util = require('./util');
var walkSync = util.walkSync;
var normalizeSlashes = util.normalizeSlashes;

var getAllSpecs = function (baseDir, entries) {
    entries = typeof entries === 'string' ? [entries] : entries;

    return entries.map(function (e) {
        return walkSync(path.resolve(baseDir, e))
            .map(function (s) {
                return normalizeSlashes(s);
            })
            .map(function (s) {
                return normalizeSlashes(`./${s.split(normalizeSlashes(baseDir))[1]}`);
            })
            .filter(function (s) {
                return /\.js/.test(s);
            });
    }).reduce(function (prev, cur) {
        return prev.concat(cur);
    });
}

module.exports = getAllSpecs;