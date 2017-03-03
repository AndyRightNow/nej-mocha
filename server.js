var express = require('express');
var path = require("path");
var cors = require('cors');

var specs = require('./get-all-specs');
var config = require("./config");
var userConfig = require('./get-user-config');

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

app.get('/testIndex', function (req, res, next) {
    res.render(path.resolve(__dirname, "index.ejs"), {
        testFiles: specs,
        PORT: config.PORT,
        globalJSON: userConfig.globals ? JSON.stringify(userConfig.globals) : "",
        globalsInjector: globalsInjector.toString()
    });
});

app.use(function (err, req, res, next) {
    console.log("ERROR:", err);

    next();
});

module.exports = app.listen(config.PORT, function () {
    console.log("Test server is running on " + config.PORT);
    console.log("Test is starting...");
});