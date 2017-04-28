var express = require('express');
var path = require("path");
var cors = require('cors');
var getAllSpecs = require('./util/get-all-specs');
var config = require('./../shared/config');

function createServer(userConfig) {
    var server = express();
    var publicDir = path.resolve(process.cwd(), userConfig._baseDir || '.');

    server.use(cors());
    server.use(express.static(publicDir));
    server.set('view engine', 'ejs')

    server.get(`/${config.CONSTANT.TEST_INDEX}`, function (req, res) {
        res.render(path.resolve(__dirname, "index.ejs"), {
            testFiles: getAllSpecs(publicDir, userConfig.entries),
            PORT: userConfig.testRunnerPort,
            globalJSON: JSON.stringify(userConfig.globals),
            nejPathAliases: userConfig.nejPathAliases,
            userConfig: userConfig,
            scriptsToInject: userConfig.scriptsToInject,
            dependencyInjectionArr: userConfig.inject
        });
    });

    server.use(function (err, req, res, next) {
        console.log("ERROR:", err);

        next();
    });

    return server;
}

module.exports = createServer;