
describe('Check vital signs', function() {
    describe('JssController', function() {

        it('Expect JssController.modules to be an array', function(done){
            expect(JssController.modules).toBeAn('array');
            done();
        });

        it('Expect JssController.activeModules to be an array', function(done){
            expect(JssController.activeModules).toBeAn('array');
            done();
        });
        it('Expect JssController.findModules to be a function', function(done){
            expect(JssController.findModules).toBeA('function');
            done();
        });

        describe('Function Tests', function() {
            describe('findModules', function() {
                // Clean JssController
                JssController.activeModules = [];
                JssController.modules = [];

                var dom = document.createElement('div');
                dom.insertAdjacentHTML( 'beforeend', '<p class="truncate" data-ellepsis="..." data-lines="2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam praesentium cum exercitationem deserunt adipisci maiores nostrum laborum, saepe architecto quae eaque, natus deleniti quod blanditiis dolorum provident dolor ea corrupti.</p>' );



                it('Expect findModules to be able to handle a domElement', function(done){
                    expect(JssController.findModules(dom)).toBeAn('array');
                    done();
                });

                it('Expect findModules to find 0 modules when activeModules array is empty', function(done){
                    expect(JssController.findModules(dom).length).toBe(1);
                    done();
                });


                JssController.activeModules.push('truncate');

                it('Expect findModules to find 1 module when activeModules array contains `truncate`', function(done){
                    expect(JssController.findModules(dom).length).toBe(1);
                    done();
                });

                it('Expect findModules to find the `truncate` module when activeModules array contains `truncate`', function(done){
                    console.log(JssController.findModules(dom));
                    expect(JssController.findModules(dom)[0].moduleName).toBe('truncate');
                    done();
                });
            });
        });
    });

    describe('JssTrigger', function() {
        var t = new JssTrigger();
        it('Expect JssTrigger be an object', function(done){
            expect(t).toBeA('object');
            done();
        });

        // Type
        it('Expect JssTrigger.type to be `JssTrigger`', function(done){
            expect(t.type).toBe('JssTrigger');
            done();
        });

        // Actions
        it('Expect JssTrigger.validateAction to be a function', function(done){
            expect(t.validateAction).toBeAn('function');
            done();
        });

        it('Expect JssTrigger.addAction to be a function', function(done){
            expect(t.addAction).toBeAn('function');
            done();
        });

        // Class names
        it('Expect JssTrigger.removeClassName to be a function', function(done){
            expect(t.removeClassName).toBeAn('function');
            done();
        });

        it('Expect JssTrigger.addClassName to be a function', function(done){
            expect(t.addClassName).toBeAn('function');
            done();
        });

        // States
        it('Expect JssTrigger.setState to be a function', function(done){
            expect(t.setState).toBeAn('function');
            done();
        });
    });


    describe('JssModule', function() {
        var t = new JssModule();
        it('Expect JssModule be an object', function(done){
            expect(t).toBeA('object');
            done();
        });

        // Type
        it('Expect JssModule.type to be `JssModule`', function(done){
            expect(t.type).toBe('JssModule');
            done();
        });

        it('Expect JssModule.init to be a function', function(done){
            expect(t.init).toBeAn('function');
            done();
        });

        it('Expect JssModule.findTriggers to be a function', function(done){
            expect(t.findTriggers).toBeAn('function');
            done();
        });

        it('Expect JssModule.configureTrigger to be a function', function(done){
            expect(t.configureTrigger).toBeAn('function');
            done();
        });

        // Actions
        it('Expect JssModule.validateAction to be a function', function(done){
            expect(t.validateAction).toBeAn('function');
            done();
        });

        it('Expect JssModule.addAction to be a function', function(done){
            expect(t.addAction).toBeAn('function');
            done();
        });

        // Class names
        it('Expect JssModule.removeClassName to be a function', function(done){
            expect(t.removeClassName).toBeAn('function');
            done();
        });

        it('Expect JssModule.addClassName to be a function', function(done){
            expect(t.addClassName).toBeAn('function');
            done();
        });

        // States
        it('Expect JssModule.setState to be a function', function(done){
            expect(t.setState).toBeAn('function');
            done();
        });

        it('Expect JssModule.hasState to be a function', function(done){
            expect(t.hasState).toBeAn('function');
            done();
        });

        it('Expect JssModule.removeState to be a function', function(done){
            expect(t.removeState).toBeAn('function');
            done();
        });

        // Data
        it('Expect JssModule.addData to be a function', function(done){
            expect(t.addData).toBeAn('function');
            done();
        });

        it('Expect JssModule.getData to be a function', function(done){
            expect(t.getData).toBeAn('function');
            done();
        });

        it('Expect JssModule.setData to be a function', function(done){
            expect(t.setData).toBeAn('function');
            done();
        });
    });

    describe('JssService', function() {
        it('Expect JssService be an object', function(done){
            expect(JssService).toBeA('object');
            done();
        });

        it('Expect JssService.activeModules be an array', function(done){
            expect(JssService.activeModules).toBeA('array');
            done();
        });

        it('Expect JssService.dev be a boolean', function(done){
            expect(JssService.dev).toBeA('boolean');
            done();
        });

        it('Expect JssService.actions be an object', function(done){
            expect(JssService.actions).toBeA('object');
            done();
        });

        it('Expect JssService.enterDelay be a number', function(done){
            expect(JssService.enterDelay).toBeA('number');
            done();
        });

        it('Expect JssService.forbiddenProperties be an array', function(done){
            expect(JssService.forbiddenProperties).toBeA('array');
            done();
        });

        it('Expect JssService.isModule be a function', function(done){
            expect(JssService.isModule).toBeA('function');
            done();
        });

        it('Expect JssService.addModule be a function', function(done){
            expect(JssService.addModule).toBeA('function');
            done();
        });

        it('Expect JssService.toCamelCase be a function', function(done){
            expect(JssService.toCamelCase).toBeA('function');
            done();
        });

        it('Expect JssService.toKebabCase be a function', function(done){
            expect(JssService.toKebabCase).toBeA('function');
            done();
        });

        it('Expect JssService.getOption be a function', function(done){
            expect(JssService.getOption).toBeA('function');
            done();
        });

        it('Expect JssService.isTrigger be a function', function(done){
            expect(JssService.isTrigger).toBeA('function');
            done();
        });

        it('Expect JssService.getTriggerName be a function', function(done){
            expect(JssService.getTriggerName).toBeA('function');
            done();
        });

        it('Expect JssService.triggerNameIsAllowed be a function', function(done){
            expect(JssService.triggerNameIsAllowed).toBeA('function');
            done();
        });


    });
});