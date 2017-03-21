# Mocha for NEJ Users 

For NEJ users, unit testing could be a pain in the neck. This package solves the headache by letting you write mocha-chai-like test files directly with NEJ module system.

# Usage

1. Install:

    ```bash
    $ npm install nej-mocha --save-dev
    ```

2. Make sure you have a `test` folder under your working directory. All `.js` files will be run recursively in this folder. Or you can specify other test folder in the configuration file.

3. Run the tests:

    ```bash
    $ nej-mocha
    ```

    or add it in your `package.json`

    ```javascript
    "scripts": {
        "test": "nej-mocha"
    }
    ```

# Configurations

A configuration file can be used to configure the test runner. Create a `nej-mocha.conf.js` or `nej-mocha.config.js` under your working directory.

## `nej-mocha.conf.js`:

```javascript 
module.exports = {
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    // Required options
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    
    /**
    * An absolute path of chrome binary.
    * 
    * Examples:
    * 
    * Mac: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    * Windows: 'C:\\Program\\ Files\\ (x86)\\Google\\Chrome\\Application\\chrome.exe'
    */
    chromePath: "",

    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    // Optional options
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------

    /**
     * Properties and nested properties to add to the `window` object. 
     * The object will be parse and add the exact same structure to the `window` object.
     *
     * Default to empty
     */
    globals: {
        // Your global properties here
    },
    /**
     * The test folder path(s) relative to your working directory.
     *
     * Only RELATIVE path is allowed.
     * Wildcard path is also supported. (E.g. './src/\*\*\/test/')
     * 
     * Default to './test'.
     */
    entries: "",
    mochaOptions: {
        /**
        * The time to wait before mocha tests exit.
        *
        * Default to 3000 ms.
        */
        timeout: 3000,
        /**
        * The mocha reporter.
        * Currently only perfectly support 'spec', 'doc', 'json', 'xunit', and 'tap'
        *
        * Default to 'spec'.
        */
        reporter: 'spec',
        /**
        * Whether the report should have colors
        *
        * Default to true.
        */
        useColors: true
        // 
        // And other supported mocha options
        // ...
    },
    /**
     * Path aliases used to passed to 'define.js' as URL parameters
     *
     * Default to only have 'pro' refering to 'src/javascript/'
     */
     nejPathAliases: {
         pro: 'src/javascript/',
         // ...
     },
     /**
      * Proxy options
      *
      * Default to empty
      */
     proxy: {
        /**
        * If you have a proxy server set up, you can pass a custom host name.
        * This will replace 'localhost'.
        * If not provided. 'localhost' is used.
        */
        host: "",
        /**
        * The port of the proxy address. Default to 'testRunnerPort'
        */
        port: 8004,
     }
     /**
      * The port for the test runner server to listen on.
      *
      * Default to 8004
      */
     testRunnerPort: 8004,
     /**
      * Should the browser be closed after the tests are run
      * 
      * Default to true
      */
     shouldBrowserClosed: true,
     /**
      * Should the browser be headless when the tests are running
      * Currently only support Linux
      * 
      * Default to true
      */
     headless: true,
     /**
      * Scripts to inject before the test html is loaded
      * Can take urls or paths relative to your working directory
      *
      * Default to empty
      */
     scriptsToInject: [
         'http://some.url/script.js',
         './some/replative/path/script.js'
     ]
}
```

# Examples

A test file will look like this:

```javascript
define([
    "{pro}/..."
], function(myModule) {
    describe("My test", function() {
        before("Some preparations", function() {
            // Anything you want to run before the tests
        });

        it("should be ok", function() {
            expect(true).to.be.true;
        });

        it("should be ok after a second", function(done) {
            setTimeout(function () {
                expect(true).to.be.true;

                done();
            }, 1000);
        });

        after("Some clean-up", function() {
            // Anything you want to run after the tests
        });
    });
});
```

It has exactly the same APIs as [`mocha`](https://mochajs.org/) and [`chai`](chaijs.com/).
