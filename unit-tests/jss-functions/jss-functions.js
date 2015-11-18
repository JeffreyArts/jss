JssService.dev = false;

describe('JSS Functions', function() {

    var obj = new Jss();
    console.log(obj);

    it("Expect type to be `Jss`", function(done){
        expect(obj.type).toBe('Jss');
        done();
    });
    it("Expect triggers to be an array", function(done){
        expect(obj.triggers).toBeAn('array');
        done();
    });

    describe('init(fn)', function() {

        it("Expect init() to return `undefined` (since it does nothing on default)", function(done){
            expect(obj.init()).toBe(undefined);
            done();
        });

        it("Expect init('foo') to return `undefined` (since it does nothing on default)", function(done){
            expect(obj.init('foo')).toBe(undefined);
            done();
        });

    });

    // Add class name
    describe('addClassName(className)', function() {
        it("Expect addClassName() to return false", function(done){
            expect(obj.addClassName()).toBe(false);
            done();
        });

        it("Expect addClassName('foo') to return false", function(done){
            expect(obj.addClassName('foo')).toBe(false);
            done();
        });

        it("Expect addClassName(['foo', 'bar']) to return false", function(done){
            expect(obj.addClassName(['foo', 'bar'])).toBe(false);
            done();
        });
    });



    describe('configureTrigger(trigger, fn)', function() {
        it("Expect configureTrigger() to return false (if you do not specify a trigger what is the use of calling this funciton anyway...)", function(done){
            expect(obj.configureTrigger()).toBe(false);
            done();
        });

        it("Expect configureTrigger('name') to return false", function(done){
            expect(obj.configureTrigger('name')).toBe(false);
            done();
        });

        it("Expect configureTrigger('name', function(){}) to return false", function(done){
            expect(obj.configureTrigger('name', function(){})).toBe(false);
            done();
        });
    });

});
