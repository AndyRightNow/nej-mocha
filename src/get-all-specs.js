var fs = require('fs');
var path = require('path');

var walkSync = function (dir, filelist) {
    var files;

    try {
        files = fs.readdirSync(dir);
    } catch (err) {
        console.log(err.message);

        return [];
    }

    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

var baseDir = path.resolve(__dirname, '../', "../", "../");


var getAllSpecs = function (testFolder) {
    const testSplit = (testFolder.split('./')[1] + '/').replace(/[\/]+/g, '/');

    return walkSync(path.resolve(baseDir, testFolder))
        .map(s => s.replace(/[\\\/]/g, "/"))
        .map(s => s.split(testSplit)[1])
        .filter(s => /\.js/.test(s));
}

module.exports = getAllSpecs;