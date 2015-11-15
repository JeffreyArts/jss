
describe('Check vital signs of JssController', function() {

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
});

describe('Testing JssController.findModules() for a domElement which contains the following HTML', function() {
    describe('<p class="truncate" data-ellepsis="..." data-lines="2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam praesentium cum exercitationem deserunt adipisci maiores nostrum laborum, saepe architecto quae eaque, natus deleniti quod blanditiis dolorum provident dolor ea corrupti.</p>', function() {
        var dom = document.createElement('div');
        dom.insertAdjacentHTML( 'beforeend', '<p class="truncate" data-ellepsis="..." data-lines="2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam praesentium cum exercitationem deserunt adipisci maiores nostrum laborum, saepe architecto quae eaque, natus deleniti quod blanditiis dolorum provident dolor ea corrupti.</p>' );

        if (JssController.activeModules.indexOf('truncate') < 0) {
            JssController.activeModules.push('truncate');
        }




        it('Expect findModules to be able to handle a domElement', function(done){
            expect(JssController.findModules(dom)).toBeAn('array');
            done();
        });

        it('Expect findModules to find 1 module ', function(done){
            expect(JssController.findModules(dom).length).toBe(1);
            done();
        });

        it('Expect findModules to find the `truncate` module ', function(done){
            console.log(JssController.findModules(dom));
            expect(JssController.findModules(dom)[0].moduleName).toBe('truncate');
            done();
        });
        //
        // var $module = 'truncate';
        // it('Expect Jss.Controller.modules to contain a property with moduleName = `' + $module + '`', function(done){
        //     var test = _.find(JssController.modules, 'moduleName', $module);
        //     expect(test).toBeAn('object');
        //     done();
        // });
    });
});