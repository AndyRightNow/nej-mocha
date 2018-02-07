const _ = require('lodash');
const path = require('path');
const Nightmare = require('nightmare');
const runServers = require('./server');
const config = require('./../shared/config');
const getUserConfig = require('./util/get-user-config');
const logger = require('./util/logger');
const normalizeUserConfig = require('./util/normalize-user-config');
const util = require('./util');
const eventHandlers = require('./util/event-handlers');

function run(options, callback) {
    let userConfig;

    try {
        userConfig = getUserConfig();
    } catch (e) {
        userConfig = {};
    }

    callback = callback || util.noop;
    if (options) {
        const optionsConfig = options.config;

        if (optionsConfig) {
            if (typeof optionsConfig === 'string') {
                try {
                    userConfig = getUserConfig(path.resolve(process.cwd(), optionsConfig));
                } catch (error) {
                    callback(error);
                    return;
                }
            } else if (typeof optionsConfig === 'object') {
                userConfig = normalizeUserConfig(_.merge(userConfig, options.config || {}));
            }
        }

        this.userConfig = userConfig;
    }

    const nightmare = Nightmare({
        show: !userConfig.headless,
    });

    let finish = util.finish.bind(this, userConfig.shouldBrowserClosed);

    runServers(userConfig, (runningCwdServer, cwdServerPort) => {
        const addr = 'http://localhost:' + cwdServerPort + '/' + config.CONSTANT.TEST_INDEX;

        finish = finish.bind(this, runningCwdServer, nightmare, callback);

        logger.info('Test server is running on ' + cwdServerPort);
        logger.info(
            'You can visit http://localhost:' +
                cwdServerPort +
                '/' +
                config.CONSTANT.TEST_INDEX +
                ' to debug the tests'
        );
        logger.info('Tests are starting...');
        this.isRunning = true;
        this.isClosed = false;
        this.end = finish;

        nightmare
            .viewport(1024, 768)
            .on('page', eventHandlers.pageEventHandler(finish))
            .on('console', eventHandlers.consoleEventHandler(userConfig, finish))
            .goto(addr)
            .catch(function(err) {
                logger.error(util.getErrorOutput(err, '  '));

                finish(err);
            });
    });
}

const nejMocha = {
    run,
    isRunning: false,
    isClosed: true,
    userConfig: null,
    end: util.noop,
};

module.exports = nejMocha;
