var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');

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
}

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
    } catch (err) {
        console.log(err.message);

        return [];
    }

    // If '.js' extension is not provided, maybe any files wildcard or a concrete folder path
    if (!/\.js$/.test(dir)) {
        // Remove all paths with .js extensions
        files = files.filter(function (f) {
            return !/\.js$/.test(f);
        });

        files = files.map(function (d) {
            return walkSyncHelper(d);
        }).reduce(function (prev, cur) {
            return prev.concat(cur);
        }, []);
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

/**
 * Recursively map all own properties with the return value of the callback
 * 
 * @param {any} obj 
 * @param {any} cb 
 */
function recurForOwn(obj, cb) {
    if (typeof obj === 'object') {
        _.forOwn(obj, function (value, key) {
            if (typeof value === 'object') {
                recurForOwn(value, cb);
            } else {
                cb(value, key, obj);
            }
        });
    }
}


function exitProcess(shouldBrowserClosed, server) {
    if (shouldBrowserClosed) {
        if (server) {
            server.close();
        }
        process.exit(0);
    }
}

module.exports = {
    printGreen,
    printRed,
    printNewLine,
    print,
    printAndNewLine,
    walkSync,
    normalizeSlashes,
    recurForOwn,
    exitProcess
};