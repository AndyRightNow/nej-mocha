var path = require('path');

var util = require('./index');
var walkSync = util.walkSync;
var normalizeSlashes = util.normalizeSlashes;

function normalizePaths(paths, baseDir) {
    return paths.map(function (s) {
            s = normalizeSlashes(s);

            return normalizeSlashes(`./${s.split(normalizeSlashes(baseDir))[1]}`);
        })
        .filter(function (s) {
            return /\.js/.test(s);
        });
}

var getAllSpecs = function (baseDir, entries) {
    entries = typeof entries === 'string' ? [entries] : entries;

    return entries.map(function (e) {
        return normalizePaths(walkSync(path.resolve(baseDir, e)), baseDir);
    }).reduce(function (prev, cur) {
        return prev.concat(cur);
    });
}

module.exports = getAllSpecs;
module.exports.helpers = {
    normalizePaths
};