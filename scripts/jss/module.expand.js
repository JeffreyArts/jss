'use strict'




//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Expand = function(element) {

    var self = this;
    self.moduleName = "expand";
    self.setElement(element);
}


Expand.prototype = Object.create(Jss.prototype);


//------------------------------------------
//  Module customs
//------------------------------------------


Expand.prototype.init = function(){
    var expand = this;
    expand.status = true;

    this.addTrigger("trigger", function(trigger) {
        trigger.addAction('click',function(){
            if (expand.status) {
                expand.setState("Closed");
                expand.removeState("Open");
                expand.status = false;
            } else {
                expand.setState("Open");
                expand.removeState("Closed");
                expand.status = true;
            }
        }, false)
    });
}