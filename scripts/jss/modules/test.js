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
    this.default = {
        test: "ABC"
    }
    this.getData('test',{
        fallback: ['ajax','cookie','attribute'],
        
        ajax: {
            url: 'http://localhost'
        }
    })
    console.log("test", this.test,this);
}
