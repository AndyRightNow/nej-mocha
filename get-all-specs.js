var fs = require('fs');
var path = require('path');

var walkSync = function (dir, filelist) {
    var files;

    try {
       files = fs.readdirSync(dir);
    }
    catch(err) {
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

var testDir = path.resolve(__dirname, '../', "../", "test");

var getAllSpecs = function (testFolder) {
    return walkSync(path.resolve(__dirname, '../', "../", testFolder))
        .map(s => s.replace(/[\\\/]/g, "/"))
        .map(s => s.split("test/")[1])
        .filter(s => /\.js/.test(s));
}

module.exports = getAllSpecs;