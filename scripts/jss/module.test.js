
var Test = function(element) {

    //----------------------------------------------
    //  Module defaults
    //----------------------------------------------

    var self = this;
    self.moduleName = "test";
    self.setElement(element);

    //----------------------------------------------
    //  Module customs
    //----------------------------------------------

    self.lightSwitch = false;

    self.addAction('click',function(){

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

    }, {addDefaults: true});
}



Test.prototype = Object.create(Jss.prototype);