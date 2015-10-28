var JssTrigger = function(element, options) {
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


JssTrigger.prototype                    = Object.create(Jss.prototype);
JssTrigger.prototype.type               = "JssTrigger";
JssTrigger.prototype.setElement         = Jss.prototype.setElement;

// Actions
//JssTrigger.prototype.actions            = Object.create(Jss.prototype.actions);
JssTrigger.prototype.validateAction     = Jss.prototype.validateAction;
JssTrigger.prototype.addAction          = Jss.prototype.addAction;

// Class names
JssTrigger.prototype.removeClassName    = Jss.prototype.removeClassName;
JssTrigger.prototype.addClassName       = Jss.prototype.addClassName;

// States
JssTrigger.prototype.setState           = Jss.prototype.setState;
JssTrigger.prototype.hasState           = Jss.prototype.hasState;
JssTrigger.prototype.removeState        = Jss.prototype.removeState;

