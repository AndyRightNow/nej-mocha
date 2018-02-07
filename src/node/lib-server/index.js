var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('./../util/logger');

function createServer() {
    var server = express();
    var publicDir = path.resolve(__dirname, '../../../');

    server.use(cors());
    server.use(express.static(publicDir));
    server.set('view engine', 'ejs');

    server.use(function(err, req, res, next) {
        if (err) {
            logger.error(err.stack);
        }

        next();
    });

    return server;
}

module.exports = createServer;
