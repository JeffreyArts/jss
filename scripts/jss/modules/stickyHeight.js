'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var StickyHeight = function(element) {
    this.moduleName = "sticky-height"; // This is the name which corresponds with the className && JssService.activeModuless
}
StickyHeight.prototype = Object.create(Jss.prototype);
JssService.addModule("stickyHeight");




//------------------------------------------
//  Module customs
//------------------------------------------

StickyHeight.prototype.init = function(){
    this.setHeight(this.getHeight());
}
