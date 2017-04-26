module.exports = {
    CONSTANT: {
        DEFAULT_PORT: 8004,
        TEST_INDEX: "testIndex",
        DEFAULT_NEJ_PRO: "src/javascript",
        DEFAULT_TEST_ENTRY: './test',
        DEFAULT_CONFIG_PATH: {
            CONF: './../../../../../nej-mocha.conf.js',
            CONFIG: './../../../../../nej-mocha.config.js'
        },
        COVERAGE_IDENTIFIER: 'nej-mocha-cover',
        INJECT_IDENTIFIER: 'nej-mocha-inject',
        MOCHA_DONE_SIGNAL: "TEST_MOCHA_DONE;",
        HAS_COVERAGE_SIGNAL: "COVERAGE_OBJECT;"
    }
};