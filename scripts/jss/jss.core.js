/**
 * @module Jss
 * @author      Jeffrey Arts <sjeffff@gmail.com>
 * @copyright   2015
 */
Jss = function(){};

Jss.prototype.type      = "Jss"
Jss.prototype.triggers  = [];
Jss.prototype.element   = undefined;                                              // {obj} domElement
Jss.prototype.state     = undefined;                                              // {str} State of module, is reflected by the css class __isState

/**
 * -----------------------------------------------------------------------------
 * Find Triggers
 * -----------------------------------------------------------------------------
 *
 * @param {domElement} element
 * @return {undefined}
 */
Jss.prototype.findTriggers = function(element) {                                                       // If this is not set, all modules will have the same reference point to this.triggers.
    // Module is created, now look for any module triggers
    this.searchTriggersRecursiveInnerFunction(this.element);

};

/**
 * -----------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------
 */
Jss.prototype.trigger = function(which, fn) {
    if (typeof this.triggers !== "object") {
        console.info("No triggers are found, please specify them in the css as `module-name--trigger-name`.");
        return false;
    }

    if (typeof this.triggers[which] !== "object") {
        console.info("You are trying to execute a function on a non existing trigger `" + which + "`");
        return false;
    }

    for (var i = 0; i < this.triggers[which].length; i++) {
        fn(this.triggers[which][i])
    }

}

/**
 * -----------------------------------------------------------------------------
 * Search triggers recursive inner function
 * -----------------------------------------------------------------------------
 * Recursive function which is executed bij findTriggers;
 *
 * @return {undefined}
 */
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
 * Configure Trigger
 * -----------------------------------------------------------------------------
 *
 * @param {string} trigger
 * @param {function} fn
 * @return {undefined}
 */
Jss.prototype.configureTrigger = function(trigger, fn) {
    if ( typeof this.triggers[trigger] == "object") {

        for (var i = 0; i < this.triggers[trigger].length; i++) {
            //self.triggers[trigger][i]
            return fn(this.triggers[trigger][i]);
        }

    } else if (JssService.dev) {
        console.error("You are trying to configure an undefined trigger.")
    }
    return false;
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