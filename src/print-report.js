const chalk = require('chalk');

let indent = "  ";
let passedTestCnt = 0;
let failedTestCnt = 0;

function printReportHelper(report, padding) {
    if (Array.isArray(report)) {
        for (let i = 0, l = report.length; i < l; i++) {
            let print = console.log.bind(console, padding);
            console.log("");
            print(report[i].title);

            if (report[i].subSuites) {
                printReportHelper(report[i].subSuites, padding + indent);
            } else {
                let testPadding = padding + indent;

                print = console.log.bind(console, testPadding);

                for (let j = 0, tests = report[i].tests, ll = tests.length, output; j < ll; j++) {
                    output = "";

                    if (tests[j].status) {
                        passedTestCnt++;
                        output += '✓';
                    } else {
                        failedTestCnt++;
                        output += '✖';
                    }

                    output += ` ${tests[j].title} `;

                    if (!tests[j].status) {
                        output += `\n\n${testPadding + indent}${tests[j].stack}`;
                    }
                    else {
                        output += (tests[j].duration > 3000 ? chalk.yellow(`(${tests[j].duration}ms)`) : chalk.green(`(${tests[j].duration}ms)`));
                    }

                    output = tests[j].status ? chalk.green(output) : chalk.red(output);

                    print(output);
                }
            }
        }
    }
}

function printReport(report) {
    passedTestCnt = 0;
    failedTestCnt = 0;

    printReportHelper(report, " ");
    console.log("");

    let passingRate = passedTestCnt / (passedTestCnt + failedTestCnt) * 100;

    if (failedTestCnt) {
        console.log(chalk.red(`  ${failedTestCnt} tests failed.`));
    }
    if (passedTestCnt) {
        console.log(chalk.green(`  ${passingRate === 100 ? "All " : ""}${passedTestCnt} tests passed.`));
    }

    console.log(`\n  Passing rate: ${passingRate === 100 ? chalk.green(passingRate + "%") : chalk.red(passingRate + "%")}`)
}

module.exports = printReport;