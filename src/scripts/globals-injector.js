function globalsInjector(globalJSON) {
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
        var global = window || {};
        for (var k in gs) {
            if (gs.hasOwnProperty(k)) {
                _injectHelper(global || {}, k, gs[k]);
            }
        }
    }
}

module.exports = globalsInjector;