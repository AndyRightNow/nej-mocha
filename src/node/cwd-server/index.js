var express = require('express');
var path = require('path');
var cors = require('cors');
var getAllSpecs = require('./../util/get-all-specs');
var logger = require('./../util/logger');
var config = require('./../../shared/config');
var nodeConfig = require('./../../node/config');

function createServer(userConfig, libServerPort, cwdServerPort) {
    var server = express();
    var publicDir = path.resolve(process.cwd(), userConfig._baseDir || '.');

    server.use(cors());
    server.use(express.static(publicDir));
    server.set('view engine', 'ejs');

    server.get(`/${config.CONSTANT.TEST_INDEX}`, function(req, res) {
        res.render(path.resolve(nodeConfig.projectDir, 'dist', 'index.ejs'), {
            testFiles: getAllSpecs(publicDir, userConfig.entries),
            libServerPort,
            cwdServerPort,
            globalJSON: JSON.stringify(userConfig.globals),
            nejPathAliases: userConfig.nejPathAliases,
            userConfig: userConfig,
            scriptsToInject: userConfig.scriptsToInject,
            dependencyInjectionArr: userConfig.inject,
            __DEV_TEST__: userConfig.__DEV_TEST__,
        });
    });

    server.use(function(err, req, res, next) {
        if (err) {
            logger.error(err.stack);
        }

        next();
    });

    return server;
}

module.exports = createServer;
