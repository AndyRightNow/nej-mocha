/* global window */

function globalsInjector(globalJSON, global) {
    global = global || window || {};
    function _injectHelper(obj, prop, value) {
        if (typeof value === 'object') {
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
    } catch (e) {
        /* istanbul ignore next */
        gs = {};
    }

    if (gs) {
        for (var k in gs) {
            if (gs.hasOwnProperty(k)) {
                _injectHelper(global || {}, k, gs[k]);
            }
        }
    }
}

module.exports = globalsInjector;
