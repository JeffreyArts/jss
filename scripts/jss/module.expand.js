'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Expand = function(element) {
    this.moduleName = "expand"; // This is the name which corresponds with the className && JssService.activeModuless
}
Expand.prototype = Object.create(Jss.prototype);





//------------------------------------------
//  Module customs
//------------------------------------------

Expand.prototype.init = function(){
    var expand = this;
    expand.status = true;

    this.addTrigger("trigger", function(trigger) {
        trigger.addAction('hover',function(){

        });
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
        }, {
            addDefaults:false
        })

    });
}