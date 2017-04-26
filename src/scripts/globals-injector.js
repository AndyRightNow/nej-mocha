(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        // CommonJS
        factory(module.exports);
    } 
    else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports);
    }
    else {
        // Browser globals
        factory(root || (root = {}));
    }
}(this, function (exports) {
    exports.globalsInjector = function (globalJSON) {
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
    };
}));