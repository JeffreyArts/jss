JssService.dev = false;
var test;

describe("JSS Functions", function() {

    //var obj = new Jss(document.createElement('dev'));
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

    describe("init(fn)", function() {

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
    describe("addClassName(className)", function() {
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


    // addAction
    describe("addAction(request, fn, options)", function(){
        it("Expect addAction() to return false (no action defined)", function(done){
            test = obj.addAction();
            expect(test).toBe(null);
            done();
        });

        it("Expect addAction('click', function(){}) to return false", function(done){
            // Call addAction function
            test = obj.addAction('click', function(){});

            expect(test).toBe(null);
            //expect(obj.actions[obj.actions.length-1]).toBeAn('object');
            done();
        });

        it("Expect addAction('click', function(){}, {addDefaults: true}) to return false", function(done){
            test = obj.addAction('click', function(){}, {addDefaults: true});
            expect(test).toBe(null);
            done();
        });
    });



    // addData
    describe("addData(attribute, value, options)", function(){
        it("Expect addData('test', 1) to set obj.test to 1", function(done){
            test = obj.addData('test', 1);

            expect(obj.test).toBe(1);
            done();
        });
        it("Expect addData('addData', 1) to not change the function `addData` to 1", function(done){
            test = obj.addData('addData', 1);

            expect(test).toBeA('function');
            done();
        });
    });


    // classNamePrefix
    describe("classNamePrefix()", function(){
        it("Expect classNamePrefix() to be equal to obj.moduleName", function(done){
            expect(obj.classNamePrefix()).toBe(obj.moduleName);
            done();
        });
    });


    // configureTrigger

    describe("configureTrigger(trigger, fn)", function() {
        it("Expect configureTrigger() to return false (if you do not specify a trigger what is the use of calling this funciton anyway...)", function(done){
            test = obj.configureTrigger();
            expect(test).toBe(null);
            done();
        });

        it("Expect configureTrigger('name') to return false", function(done){
            test = obj.configureTrigger('name');
            expect(test).toBe(null);
            done();
        });

        it("Expect configureTrigger('name', function(){}) to return false", function(done){
            test = obj.configureTrigger('name', function(){});
            expect(test).toBe(null);
            done();
        });
    });


    // findTriggers
    describe("findTriggers(element)", function(){
        describe("(alias for searchTriggersRecursiveInnerFunction(element))", function(){
            //
        });
    });


    // getActionElement
    describe("getActionElement(request)", function(){
        it("Expect getActionElement() to return false", function(done){
            test = obj.getActionElement();
            expect(test).toBe(null);
            done();
        });

        it("Expect getActionElement('click') to return an object", function(done){
            test = obj.getActionElement('click');
            expect(test).toBeA('object');
            done();
        });

        it("Expect the return object of getActionElement('click') to be { element: undefined, request: 'click' }", function(done){
            expect(test.element).toBe(undefined);
            expect(test.request).toBe('click');
            done();
        });

        it("Expect getActionElement('window.resize') to return an object", function(done){
            test = obj.getActionElement('window.resize');
            expect(test).toBeA('object');
            done();
        });

        it("Expect the return object of getActionElement('window.resize') to be { element: window, request: 'resize' }", function(done){
            expect(test.element).toBe(window);
            expect(test.request).toBe('resize');
            done();
        });
    });


    // getData
    describe("getData(attribute, options)", function(){
        it("Expect getData('test') to return 1", function(done){
            obj.addData('test',1);
            test = obj.getData('test');
            expect(test).toBe(1);
            done();
        });
    });


    // getDataAjax
    describe("getDataAjax(attribute, options)", function(){
        // No stable API to test this method
        /*it("Expect getDataAjax(attribute, options) to return ...", function(done){
            expect(obj.getDataAjax(attribute, options)).toBe(false);
            done();
        });*/

    })


    // getDataAttribute
    describe("getDataAttribute(attribute)", function(){
        it("Expect getDataAttribute(attribute) to return null", function(done){
            expect(obj.getDataAttribute('test')).toBe(null);
            done();
        });
    });


    // getDataCookie
    describe("getDataCookie(attribute)", function(){
        it("Expect getDataCookie('test') to return undefined", function(done){
            expect(obj.getDataCookie(attribute)).toBe(false);
            done();
        });
    })


    // getHeight
    describe("getHeight(", function(){
        it("Expect getHeight() to return ...", function(done){
            expect(obj.getHeight()).toBe(false);
            done();
        });
    })


    // getWidth
    describe("getWidth(", function(){
        it("Expect getWidth() to return ...", function(done){
            expect(obj.getWidth()).toBe(false);
            done();
        });
    })


    // hasState
    describe("hasState(str", function(){
        it("Expect hasState(str) to return ...", function(done){
            expect(obj.hasState(str)).toBe(false);
            done();
        });
    })


    // init
    describe("init(func", function(){
        it("Expect init(func) to return ...", function(done){
            expect(obj.init(func)).toBe(false);
            done();
        });
    })


    // removeClassName
    describe("removeClassName(input", function(){
        it("Expect removeClassName(input) to return ...", function(done){
            expect(obj.removeClassName(input)).toBe(false);
            done();
        });
    })


    // removeState
    describe("removeState(str", function(){
        it("Expect removeState(str) to return ...", function(done){
            expect(obj.removeState(str)).toBe(false);
            done();
        });
    })


    // searchTriggersRecursiveInnerFunction
    describe("searchTriggersRecursiveInnerFunction(element", function(){
        it("Expect searchTriggersRecursiveInnerFunction(element) to return ...", function(done){
            expect(obj.searchTriggersRecursiveInnerFunction(element)).toBe(false);
            done();
        });
    })


    // setData
    describe("setData(attribute, value, options", function(){
        it("Expect setData(attribute, value, options) to return ...", function(done){
            expect(obj.setData(attribute, value, options)).toBe(false);
            done();
        });
    })


    // setDataAjax
    describe("setDataAjax(attribute, value, options", function(){
        it("Expect setDataAjax(attribute, value, options) to return ...", function(done){
            expect(obj.setDataAjax(attribute, value, options)).toBe(false);
            done();
        });
    })


    // setDataAttribute
    describe("setDataAttribute(attribute, value", function(){
        it("Expect setDataAttribute(attribute, value) to return ...", function(done){
            expect(obj.setDataAttribute(attribute, value)).toBe(false);
            done();
        });
    })


    // setDataCookie
    describe("setDataCookie(attribute, value, options", function(){
        it("Expect setDataCookie(attribute, value, options) to return ...", function(done){
            expect(obj.setDataCookie(attribute, value, options)).toBe(false);
            done();
        });
    })


    // setElement
    describe("setElement(element", function(){
        it("Expect setElement(element) to return ...", function(done){
            expect(obj.setElement(element)).toBe(false);
            done();
        });
    })


    // setHeight
    describe("setHeight(height", function(){
        it("Expect setHeight(height) to return ...", function(done){
            expect(obj.setHeight(height)).toBe(false);
            done();
        });
    })


    // setState
    describe("setState(str", function(){
        it("Expect setState(str) to return ...", function(done){
            expect(obj.setState(str)).toBe(false);
            done();
        });
    })


    // setWidth
    describe("setWidth(width", function(){
        it("Expect setWidth(width) to return ...", function(done){
            expect(obj.setWidth(width)).toBe(false);
            done();
        });
    })


    // trigger
    describe("trigger(which, fn", function(){
        it("Expect trigger(which, fn) to return ...", function(done){
            expect(obj.trigger(which, fn)).toBe(false);
            done();
        });
    })



    // validateAction
    describe("validateAction(request", function(){
        it("Expect validateAction(request) to return ...", function(done){
            expect(validateAction(request)).toBe(false);
            done();
        });
    })

});
