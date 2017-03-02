# Mocha for NEJ Users

For NEJ users, unit testing could be a pain in the neck. This package solves the headache by letting you write mocha-chai-like test files directly with NEJ module system.

# Usage

1. Install:

    ```bash
    $ npm install nej-mocha --save-dev
    ```

2. Make sure you have a `test` folder under your working directory. All `.js` files will be run recursively in this folder.

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

## Options:

### **globals**

* Type: `Object`

* Description: Properties and nested properties to add to the `window` object. The object will be parse and add the exact same structure to the `window` object.

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

        after("Some clean-up", function() {
            // Anything you want to run after the tests
        });
    });
});
```

It has exactly the same APIs as `mocha` and `chai`.

# Notes

The package is currently customized for MOOC team. More generic features and more cli options will be updated later.