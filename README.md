<p align="left">
    <a target="_blank" href="https://www.npmjs.com/package/nej-mocha">
        <img src="https://img.shields.io/npm/v/nej-mocha.svg" alt="Version">
    </a>
</p>

# Mocha for NEJ Users 

For NEJ users, unit testing could be a pain in the neck. This package solves the headache by letting you write mocha-chai-like test files directly with NEJ module system.

# Why This?

1. Easy to use and no boilerplates needed. Just wrap your `mocha` and `chai` code in `NEJ.define` and it is done!
2. Headless browser tests running on the latest **Chromium** instead of PhantomJS. Almost all new **ES6** features are supported. Writing tests is just so much more efficient.
3. Built-in [**coverage reports**](#coverage) using [`istanbul`](https://github.com/gotwarlost/istanbul).
4. [**Dependency injections**](#dependency-injection), just like [`inject-loader`](https://github.com/plasticine/inject-loader) for Webpack, let you have more control over your tests.

# Usage

1. Install:

    ```bash
    $ npm install nej-mocha --save-dev
    ```

2. Configure your test files in `nej-mocha.conf.js`. If not, all `.js` files under `/test` in your working directory will be run recursively.

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
     * Can accept a string or an array
     * 
     * Default to './test'.
     */
    entries: [
        './test'
    ],
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
     },
     /**
      * The port for the test runner server to listen on.
      *
      * Default to 8004
      */
     testRunnerPort: 8004,
     /**
      * Should the browser be closed after the tests are done
      * 
      * Default to true
      */
     shouldBrowserClosed: true,
     /**
      * Should the browser be headless when the tests are running
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
     ],
     /**
      * Whether a test coverage report should be generated
      *
      * Default to false
      */
     coverage: false,
     /**
      * The test coverage tool configurations
      *
      */
     coverageOptions: {
         /**
          * Reporters used to present the coverage report
          *
          * Default to 'text'
          */
         reporters: [
             'text'
         ]
     },
     /**
      * Dependency injections
      * 
      * It replaces the patterns provided in the keys with the paths in the values. The new paths are still parsed by NEJ and therefore you can use 
      * any path patterns that NEJ can recognize.
      *
      * Do not forget to add the instruction comment in files you want to inject dependencies
      *
      * @param {RegExp|string} pattern The pattern to match
      * @param {string} path The new path to inject. If a relative path is used, it is relative to the file that has the dependency pattern.
      */
     inject: [
         {
             pattern: 'some/literal/path',
             path: 'some/new/path'
         },
         {
             pattern: /some\/regex\/path/,
             path: 'some/new/path'
         }
     ]
}
```

# Dependency Injection

You can replace paths that match the given pattern with the new paths you provided at runtime. In other words, you can replace some dependencies with some mocked objects or data. Therefore you don't need and switches or back doors in your code to make it easier to test.

### **Usage:**

1. Add `/* nej-inject */` or `// nej-inject` in the callback function of `NEJ.define` and this file will be included in dependency injections.
2. In `nej-mocha.conf.js`, add options about the patterns to replace and the new paths.

### **Examples:**

A file:

```javascript
define([
    'pro/some/path/to/replace'
], function (someComplexObject) {

});
```

after dependency injection, will be:

```javascript
define([
    'pro/some/new/path'
], function (someComplexObject) {

});
```

# Coverage 

You can generate test coverage reports by setting the `coverage` option in `nej-mocha.conf.js` to `true`. You can also configure the reports to use different kinds of reporters. For a whole list of reporters supported, please read the documentation of [istanbul](https://github.com/gotwarlost/istanbul);

### **Usage:**

Add `/* nej-mocha-cover */` or `// nej-mocha-cover` in the callback function of `NEJ.define` and this file will be covered and added to the reports generated.

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
