'use strict'

var JssTrigger = function(element, options) {
    this.type = "JssTrigger";
    this.setElement(element);

    if (typeof options === "object") {
        if (typeof options.module === "object") {
            this.module = options.module;
        }
        if (typeof options.moduleName === "string") {
            this.moduleName = options.moduleName;
        }
        if (typeof options.triggerName === "string") {
            this.triggerName = options.triggerName;
        }
    }
}

JssTrigger.prototype = Object.create(Jss.prototype);
