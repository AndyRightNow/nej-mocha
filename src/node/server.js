var express = require('express');
var path = require("path");
var cors = require('cors');

var getAllSpecs = require('./util/get-all-specs');
var userConfig = require('./util/get-user-config');

var app = express();
var publicDir = path.resolve(__dirname, "../", "../", "../", '../');

app.use(cors());
app.use(express.static(publicDir));
app.set('view engine', 'ejs')

app.get('/testIndex', function (req, res) {
    res.render(path.resolve(__dirname, '../', '../', "index.ejs"), {
        testFiles: getAllSpecs(publicDir, userConfig.entries),
        PORT: userConfig.testRunnerPort,
        globalJSON: JSON.stringify(userConfig.globals),
        nejPathAliases: userConfig.nejPathAliases,
        userConfig: userConfig,
        scriptsToInject: userConfig.scriptsToInject,
        dependencyInjectionArr: userConfig.inject
    });
});

app.use(function (err, req, res, next) {
    console.log("ERROR:", err);

    next();
});

module.exports = app;