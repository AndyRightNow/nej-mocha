var fs = require('fs');
var path = require('path');

const {
    walkSync,
    normalizeSlashes
} = require('./util');

var getAllSpecs = function (baseDir, entries) {
    entries = typeof entries === 'string' ? [entries] : entries;

    return entries.map(e => {
        return walkSync(path.resolve(baseDir, e))
            .map(s => normalizeSlashes(s))
            .map(s => normalizeSlashes(`./${s.split(normalizeSlashes(baseDir))[1]}`))
            .filter(s => /\.js/.test(s));
    }).reduce((prev, cur) => prev.concat(cur));
}

module.exports = getAllSpecs;