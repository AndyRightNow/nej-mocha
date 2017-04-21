var express = require('express');
var path = require("path");
var fs = require("fs");
var cors = require('cors');

var getAllSpecs = require('./src/get-all-specs');
var config = require("./config");
var userConfig = require('./src/get-user-config');

var app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../", "../")));
app.set('view engine', 'ejs')

var globalsInjector = function (globalJSON) {
    function _injectHelper(obj, prop, value) {
        if (typeof value === "object") {
            obj[prop] = {};
            for (var k in value) {
                if (value.hasOwnProperty(k)) {
                    _injectHelper(obj[prop], k, value[k]);
                }
            }
        } else {
            obj[prop] = value;
        }
    }

    var gs = null;
    try {
        gs = JSON.parse(globalJSON);
    } catch (e) {}

    if (gs) {
        window = window || {};
        for (var k in gs) {
            if (gs.hasOwnProperty(k)) {
                _injectHelper(window || {}, k, gs[k]);
            }
        }
    }
}

// Check if node_modules is nested
let nestedDependencies;
try {
    fs.readdirSync(path.resolve(__dirname, 'node_modules'));

    nestedDependencies = true;
}
catch(e) {
    nestedDependencies = false;
}

app.get('/testIndex', function (req, res, next) {
    res.render(path.resolve(__dirname, "index.ejs"), {
        testFiles: getAllSpecs(path.resolve(__dirname, "../", '../'), userConfig.entries),
        PORT: userConfig.testRunnerPort,
        globalJSON: JSON.stringify(userConfig.globals),
        globalsInjector: globalsInjector.toString(),
        nejPathAliases: userConfig.nejPathAliases,
        mochaOptions: userConfig.mochaOptions,
        nestedDependencies,
        scriptsToInject: userConfig.scriptsToInject,
        dependencyInjectionMap: userConfig.inject
    });
});

app.use(function (err, req, res, next) {
    console.log("ERROR:", err);

    next();
});

module.exports = app;