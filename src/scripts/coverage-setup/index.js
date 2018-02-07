/* global NEJ, dependencyInjectionArr */

var util = require('./util');
var Instrumenter = require('./../../../node_modules/istanbul/lib/instrumenter');
require('./../../../node_modules/esprima/dist/esprima.js');

function coverageSetup() {
    var originalDefine = NEJ.define;
    var instrumenter = new Instrumenter();
    /* eslint no-undef:off */
    NEJ.define = window.define = function() {
        function getFilePath() {
            var ua =
                (typeof window !== 'undefined' &&
                    window.navigator &&
                    window.navigator.userAgent &&
                    window.navigator.userAgent.toLowerCase()) ||
                '';

            if (!ua || !/chrome/i.test(ua)) {
                console.error(
                    'Please run the test index page in chromium browsers. Other browsers are currently not supported.'
                );
                return ``;
            }
            var matched = new Error().stack.match(/(at.*)/g);
            var path = matched && matched.length && matched[matched.length - 1];

            return (
                path &&
                path
                    .replace('at ', '')
                    .replace(/:\d+:\d+$/, '')
                    .replace(/^http:\/\/.*?\//, '')
            );
        }

        var uri, deps, cb;
        var filePath = getFilePath();

        switch (arguments.length) {
            case 1:
                cb = arguments[0];
                break;
            case 2:
                deps = arguments[0];
                cb = arguments[1];
                break;
            case 3:
                uri = arguments[0];
                deps = arguments[1];
                cb = arguments[2];
                break;
            default:
                return;
        }

        util.applyInjections(cb, deps, dependencyInjectionArr);
        cb = util.instrumentFunction(cb, instrumenter, filePath) || cb;

        originalDefine.apply(NEJ, uri ? [uri, deps, cb] : [deps, cb]);
    };
}

module.exports = coverageSetup;
