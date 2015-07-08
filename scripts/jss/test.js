
var Test = function(element) {
    var self = this;
    self.moduleName = "test";
    self.lightSwitch = false;

    self.init(element)
    self.addAction('click',function(){
        if (self.lightSwitch) {
            self.setState("Closed");
            self.lightSwitch = false;
        } else {
            self.setState("Open");
            self.lightSwitch = true;
        }
    })
}

Test.prototype = Object.create(Jss.prototype);
