module.exports = {
    globals: {},
    entries: [
    ],
    nejPathAliases: {
    },
    mochaOptions: {
        timeout: 110000,
        useColors: true,
        reporter: 'spec'
    },
    testRunnerPort: 8004,
    shouldBrowserClosed: true,
    headless: true,
    scriptsToInject: [
    ],
    coverage: true,
    coverageOptions: {
        reporters: [
            'text'
        ]
    }
};
