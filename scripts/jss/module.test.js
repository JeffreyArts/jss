
var Test = function(element) {
    var self = this;
    self.moduleName = "test";
    //self.init(function(){ /*...*/ })


    self.lightSwitch = false;

    /*self.addAction('click',function(){

        if (self.lightSwitch) {
            self.setState("Closed");
            self.removeState("Open");
            self.lightSwitch = false;
        } else {
            self.setState("Open");
            self.removeState("Closed");
            self.lightSwitch = true;
        }
    })
    self.addAction('hover',function(){

    })*/
}

Test.prototype = Object.create(JssModule.prototype);
