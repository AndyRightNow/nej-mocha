const chalk = require('chalk');

const printGreen = function (str) {
    console.log(chalk.green(str));
}

const printRed = function (str) {
    console.log(chalk.red(str));
}

const printNewLine = function () {
    console.log("");
}

const print = function () {
    console.log.apply(console, Array.from(arguments));
}

const printAndNewLine = function () {
    print.apply(null, Array.from(arguments));
    printNewLine();
}

module.exports = {
    printGreen,
    printRed,
    printNewLine,
    print,
    printAndNewLine
};