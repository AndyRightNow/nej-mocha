var userConfig;

try {
    userConfig = require('./../../../nej-mocha.conf.js');
}
catch(e) {
    try {
        userConfig = require('./../../../nej-mocha.config.js');
    }
    catch(e) {
        userConfig = {};
    }
}

module.exports = userConfig;