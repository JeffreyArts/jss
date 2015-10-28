var expect = require('expect');
var jss = require('../lib/jss.test');

describe('String manipulation with the following string: "Hans Teeuwen"', function() {
    var string = 'Hans Teeuwen';
    it('Should be `HansTeeuwen` in CamelCase', function(done){
        expect(JssService.toCamelCase(string)).toBe('HansTeeuwen');
        done();
    });

    it('Should be `hans-teeuwen` in kebab-case', function(done){
        expect(JssService.toKebabCase(string)).toBe('hans-teeuwen');
       done();
   });
});


describe('Options object handler', function() {
    var options = {
        "addDefaults": "random string",
        "fallback": ["b","a","c"],
        "size": 158
    };

    // Special case add Defaults
    it('Checks special case: `addDefaults` with a string "random string"', function(done){
        expect(JssService.getOption("addDefaults", options)).toBe(true);
        done();
    });

    it('Checks special case: `addDefaults` with a boolean `true`', function(done){
        options.addDefaults = true;
        expect(JssService.getOption("addDefaults", options)).toBe(true);
        done();
    });

    it('Checks special case: `addDefaults` with a boolean `false`', function(done){
        options.addDefaults = false;
        expect(JssService.getOption("addDefaults", options)).toBe(false);
        done();
    });


    // Special case add Fallback
    it('Expects special case: `fallback` with value `array[b,a,c]` to be an array', function(done){
        expect(JssService.getOption("fallback", options)).toBeA('array');
       done();
    });

    it('Expects special case: `fallback` with value `array[]` to be false', function(done){
        options.fallback = [];
        expect(JssService.getOption("fallback", options)).toBe(false);
       done();
    });

    it('Expects special case: `fallback` with value `"test"` to be an array', function(done){
        options.fallback = "test";
        expect(JssService.getOption("fallback", options)).toBeA("array");
       done();
    });
});