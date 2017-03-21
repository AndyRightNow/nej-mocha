const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function printGreen(str) {
    console.log(chalk.green(str));
}

function printRed(str) {
    console.log(chalk.red(str));
}

function printNewLine() {
    console.log("");
}

function print() {
    console.log.apply(console, Array.from(arguments));
}

function printAndNewLine() {
    print.apply(null, Array.from(arguments));
    printNewLine();
}

function walkSyncHelper(dir, filelist) {
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
            filelist = walkSyncHelper(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });

    return filelist;
};

/**
 * Recursively walk through all files in a concrete or wildcard directory synchronously
 * 
 * @param {any} dir 
 * @param {any} filelist 
 * @returns {Array} Paths, relative to the cwd, of all files in the directory
 */
function walkSync(dir) {
    let files;

    try {
        files = glob.sync(dir);
    }
    catch (err) {
        console.log(err.message);

        return [];
    }

    // If '.js' extension is not provided, maybe any files wildcard or a concrete folder path
    if (!/\.js$/.test(dir)) {
        // Remove all paths with .js extensions
        files = files.filter(f => !/\.js$/.test(f));
        
        files = files.map(d => walkSyncHelper(d)).reduce((prev, cur) => prev.concat(cur), []);
    }
    
    return files;
}

/**
 * Normalize a path. Remove extra slashes and replace all backslashes with slashes.
 * 
 * @param {any} path 
 * @returns 
 */
function normalizeSlashes(path) {
    return path.replace(/[\\\/]+/g, '/');
}

module.exports = {
    printGreen,
    printRed,
    printNewLine,
    print,
    printAndNewLine,
    walkSync,
    normalizeSlashes
};