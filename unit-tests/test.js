
describe('Load all modules - Expect JssController.findModules to fill the JssController.modules array', function() {

    it('Expect Jss.Controller.modules to be an array', function(done){
        expect(JssController.modules).toBeAn('array');
        done();
    });

    it('Expect Jss.Controller.modules.length to be greater then 0', function(done){
        expect(JssController.modules.length).toBeGreaterThan(0);
        done();
    });

    var $module = 'truncate';
    it('Expect Jss.Controller.modules to contain a property with moduleName = `' + $module + '`', function(done){
        var test = _.find(JssController.modules, 'moduleName', $module);
        expect(test).toBeAn('object');
        done();
    });
});