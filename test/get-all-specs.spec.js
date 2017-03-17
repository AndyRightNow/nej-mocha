const expect = require('chai').expect;
const path = require('path');
const getAllSpecs = require('./../src/get-all-specs');

describe("Function getAllSpecs", () => {
    let specs;

    before("Get all specs in testSpec folder", () => {
        specs = getAllSpecs(path.resolve(__dirname), "./testSpec");
    });

    it("should have correct results", () => {
        let expected = [
            'test1.js',
            'test2.js',
            'folder1/test1.js'
        ];

        expect(specs).to.have.members(expected);
    });
});