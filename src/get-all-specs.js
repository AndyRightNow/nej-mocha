var fs = require('fs');
var path = require('path');

const {
    walkSync,
    normalizeSlashes
} = require('./util');

var getAllSpecs = function (baseDir, entries) {
    return walkSync(path.resolve(baseDir, entries))
        .map(s => normalizeSlashes(s))
        .map(s => normalizeSlashes(`./${s.split(normalizeSlashes(baseDir))[1]}`))
        .filter(s => /\.js/.test(s));
}

module.exports = getAllSpecs;