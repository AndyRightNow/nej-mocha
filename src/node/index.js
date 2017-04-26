var _ = require('lodash');
var Nightmare = require('nightmare');
var server = require('./server');
var config = require('./../shared/config');
var userConfig = require('./util/get-user-config');
var util = require('./util');
var eventHandlers = require('./util/event-handlers');

var addr = 'http://localhost:' + userConfig.testRunnerPort + '/' + config.CONSTANT.TEST_INDEX;

function run(options) {
    if (options) {
        userConfig = _.merge(userConfig, options.config || {});
    }

    var nightmare = Nightmare({
        show: !userConfig.headless
    });

    var exitProcess = util.exitProcess.bind(null, userConfig.shouldBrowserClosed);

    var runningServer = server.listen(userConfig.testRunnerPort, function () {
        exitProcess = exitProcess.bind(null, runningServer);
        
        console.log("  Test server is running on " + userConfig.testRunnerPort);
        console.log("  Tests are starting...");

        nightmare
            .viewport(1024, 768)
            .on('page', eventHandlers.pageEventHandler(exitProcess))
            .on('console', eventHandlers.consoleEventHandler(exitProcess))
            .goto(addr)
            .catch(function (err) {
                util.printRed("  " + err);

                exitProcess();
            });
    });
}

module.exports = {
    run
};