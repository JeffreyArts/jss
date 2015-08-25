'use strict'


var Jss = function(){};

Jss.prototype.type      = "Jss"
Jss.prototype.triggers  = false;
Jss.prototype.element   = undefined;                                              // {obj} domElement
Jss.prototype.state     = undefined;                                              // {str} State of module, is reflected by the css class __isState

Jss.prototype.findTriggers = function(element) {
    this.triggers = [];                                                         // If this is not set, all modules will have the same reference point to this.triggers.
    // Module is created, now look for any module triggers
    this.searchTriggersRecursiveInnerFunction(this.element)

}
Jss.prototype.searchTriggersRecursiveInnerFunction = function(element) {
    var self = this;
    if (typeof element == "undefined" ) {
        element = this.element;
    }
    if ( element.hasChildNodes() ) {
        for (var i=0; i < element.childNodes.length; i++) {

            var childElement = element.childNodes[i];                           // Improve readability

            if (childElement.nodeType == 1) {                                   // NodeType 1 == domElement

                if (JssService.isTrigger(childElement, this.moduleName)) {

                    // Add a child element
                    if (JssService.triggerNameIsAllowed(childElement, this.moduleName)) {
                        var triggerName = JssService.getTriggerName(childElement, this.moduleName)

                        if (typeof self.triggers[triggerName] !== "object") {
                            self.triggers[triggerName] = [];
                        }

                        var tmp = new JssTrigger(childElement, {
                            module: self,
                            moduleName: this.moduleName,
                            triggerName: triggerName,
                        });

                        self.triggers[triggerName].push(tmp);
                    }
                }
                if (childElement.hasChildNodes()) {
                    self.searchTriggersRecursiveInnerFunction(childElement)
                }
            }
        }
    }
    return false;
}

/**
 * -----------------------------------------------------------------------------
 * Add Trigger
 * -----------------------------------------------------------------------------
 *
 * @return {undefined}
 */
Jss.prototype.addTrigger = function(trigger, fn) {
    if ( typeof this.triggers[trigger] == "object") {

        for (var i = 0; i < this.triggers[trigger].length; i++) {
            //self.triggers[trigger][i]
            fn(this.triggers[trigger][i]);
        }

    } else if (JssService.dev) {
        console.error("You are trying to add a trigger which has no attached domElement")
    }
}


/**
 * -----------------------------------------------------------------------------
 *   Init
 * -----------------------------------------------------------------------------
 * Notice the user that a init function needs to be added for controlling the triggers
 *
 * @return {undefined}
 */
Jss.prototype.init = function(func) {
    if (JssService.dev) {
        console.info(this.moduleName + ": Add a prototype.init function to add triggers and stuff")
    }
}

/**
 * -----------------------------------------------------------------------------
 * Set element
 * -----------------------------------------------------------------------------
 * Add a domElement to `this`
 *
 * @return {undefined}
 */
Jss.prototype.setElement = function(element) {
    if (typeof element == "undefined") {
        if (JssService.dev) {
            return console.error("First parameter of setElement needs to be a domElement");
        }
    }
    this.element = element;
}