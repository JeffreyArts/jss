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
    this.element.style.height = this.element.offsetHeight + "px";
    // Add setStyle function to validate style values and add prefixes like -webkit-transition when adding a transition. `this.setStyle('height', 123)`
}