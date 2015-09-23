'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Test = function(element) {
    this.moduleName = "test"; // This is the name which corresponds with the className && JssService.activeModuless
}
Test.prototype = Object.create(Jss.prototype);
JssService.addModule("test");




//------------------------------------------
//  Module customs
//------------------------------------------

Test.prototype.init = function(){
    console.log("test",this);
    this.default = {
        test: "ABC"
    }
    this.addData('test','Hup holland hup',{
        fallback: ['attribute']
    })
}
