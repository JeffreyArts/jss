var expect = require('expect');
var jss = require('../lib/jss.test');

describe('Expect jssService.toCamelCase]String manipulation with the following string: "Hans Teeuwen"', function() {
    var string = 'Hans Teeuwen';
    it('Should be `HansTeeuwen` in CamelCase', function(done){
        expect(JssService.toCamelCase(string)).toBe('HansTeeuwen');
        done();
    });

    it('Expect jssService.toKebabCase] Should be `hans-teeuwen` in kebab-case', function(done){
        expect(JssService.toKebabCase(string)).toBe('hans-teeuwen');
       done();
   });
});


describe('Options object handler (options = {"addDefaults": "random string", "fallback": ["b","a","c"],"size": 158})', function() {
    var options = {
        "addDefaults": "random string",
        "fallback": ["b","a","c"],
        "size": 158
    };

    // Special case add Defaults
    it('Expect jssService.getOption("addDefaults", options) to return string "random string"', function(done){
        expect(JssService.getOption("addDefaults", options)).toBe(true);
        done();
    });

    it('Expect (update options.addDefaults = true) jssService.getOption("addDefaults", options) to return boolean `true`', function(done){
        options.addDefaults = true;
        expect(JssService.getOption("addDefaults", options)).toBe(true);
        done();
    });

    it('Expect (update options.addDefaults = false) jssService.getOption("addDefaults", options) to return boolean `false`', function(done){
        options.addDefaults = false;
        expect(JssService.getOption("addDefaults", options)).toBe(false);
        done();
    });


    // Special case add Fallback
    it('Expect jssService.getOption("fallback", options) to return an array', function(done){
        expect(JssService.getOption("fallback", options)).toBeA('array');
       done();
    });

    it('Expect jssService.getOption("fallback", options) to return a boolean `false`', function(done){
        options.fallback = [];
        expect(JssService.getOption("fallback", options)).toBe(false);
       done();
    });

    it('Expect jssService.getOption("fallback", options) to return an array', function(done){
        options.fallback = "test";
        expect(JssService.getOption("fallback", options)).toBeA("array");
       done();
    });
});

describe('Module functions', function() {

    it('Expect jssService.addModule("Carousel") to add "carousel" to the array this.activeModules', function(done){
        JssService.addModule("Carousel");
        expect(JssService.activeModules.indexOf("carousel")).toNotBe(-1);
        done();
    });

});