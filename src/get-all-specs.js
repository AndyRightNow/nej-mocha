var fs = require('fs');
var path = require('path');

const {
    walkSync
} = require('./util');

var getAllSpecs = function (baseDir, testFolder) {
    const testSplit = (testFolder.split('./')[1] + '/').replace(/[\/]+/g, '/');

    return walkSync(path.resolve(baseDir, testFolder))
        .map(s => s.replace(/[\\\/]/g, "/"))
        .map(s => s.split(testSplit)[1])
        .filter(s => /\.js/.test(s));
}

module.exports = getAllSpecs;