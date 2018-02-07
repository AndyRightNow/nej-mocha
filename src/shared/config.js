module.exports = {
    CONSTANT: {
        DEFAULT_CWD_SERVER_PORT: 8004,
        DEFAULT_LIB_SERVER_PORT: 7999,
        TEST_INDEX: 'nej-mocha',
        DEFAULT_NEJ_PRO: 'src/javascript',
        DEFAULT_TEST_ENTRY: './test',
        DEFAULT_CONFIG_FILENAME: {
            CONF: 'nej-mocha.conf.js',
            CONFIG: 'nej-mocha.config.js',
        },
        COVERAGE_IDENTIFIER: 'nej-mocha-cover',
        COVERAGE_IGNORE_IDENTIFIER: 'nej-mocha-cover-ignore',
        INJECT_IDENTIFIER: 'nej-mocha-inject',
        MOCHA_DONE_SIGNAL: 'TEST_MOCHA_DONE;',
        HAS_COVERAGE_SIGNAL: 'COVERAGE_OBJECT;',
        IPC_MESSAGES: {
            SERVER_PORT: 'IPC_SERVER_PORT: ',
            CLOSE_SERVER: 'IPC_CLOSE_SERVER',
        },
    },
};
