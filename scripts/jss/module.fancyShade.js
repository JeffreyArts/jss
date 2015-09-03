'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var FancyShade = function(element) {
    this.moduleName = "fancyShade"; // This is the name which corresponds with the className && JssService.activeModuless
}
FancyShade.prototype = Object.create(Jss.prototype);
JssService.addModule("fancy-shade")




//------------------------------------------
//  Module customs
//------------------------------------------

FancyShade.prototype.init = function(){

    var self = this;

    this.addAction('click',function(){
        if (self.status) {
            self.setState("Closed");
            self.removeState("Open");
            self.status = false;
        } else {
            self.setState("Open");
            self.removeState("Closed");
            self.status = true;
        }
    }, {
        addDefaults:false
    });
}