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
