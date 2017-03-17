const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

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

/**
 * Recursively walk through all files in a directory synchronously
 * 
 * @param {any} dir 
 * @param {any} filelist 
 * @returns 
 */
function walkSync(dir, filelist) {
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

module.exports = {
    printGreen,
    printRed,
    printNewLine,
    print,
    printAndNewLine,
    walkSync
};