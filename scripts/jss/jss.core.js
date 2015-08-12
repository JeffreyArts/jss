'use strict'


var Jss = function(){};

Jss.prototype.type      = "Jss"
Jss.prototype.triggers  = {};
Jss.prototype.element   = undefined;                                              // {obj} domElement
Jss.prototype.state     = undefined;                                              // {str} State of module, is reflected by the css class __isState
Jss.prototype.actions   = JssService.actions;

Jss.prototype.forbiddenProperties = JssService.forbiddenProperties;


Jss.prototype.findTriggers = function(element) {
    var self = this;
    if (typeof element == "undefined") {
        element = this.element;
    }

    // Module is created, now look for any module triggers
    if ( element.hasChildNodes() ) {
        for (var i=0; i < element.childNodes.length; i++) {

            var childElement = element.childNodes[i];
            
            if (childElement.nodeType == 1) {          // NodeType 1 == domElement
                if (JssService.isTrigger(childElement, this.moduleName)) {
                    
                    // Add a child element
                    if (JssService.triggerNameIsAllowed(childElement, this.moduleName)) {
                        var triggerName = JssService.getTriggerName(childElement, this.moduleName)
                    
                        if (typeof self.triggers[triggerName] !== "object") {
                            self.triggers[triggerName] = [];
                        }

                        var tmp = new JssTrigger(childElement, {
                            module: this,
                            moduleName: this.moduleName,
                            triggerName: triggerName,
                        });

                        self.triggers[triggerName].push(tmp);
                    }
                }
            }
        }
    }
}

Jss.prototype.addTrigger = function(trigger, fn) {
    if ( typeof this.triggers[trigger] == "object") {

        for (var i = 0; i < this.triggers[trigger].length; i++) {
            //self.triggers[trigger][i]
            fn(this.triggers[trigger][i]);
        }
        console.log(this.triggers[trigger])

    } else if (JssService.dev) {
        console.error("You are trying to add a trigger which has no attached domElement")
    }
}


Jss.prototype.toCamelCase = function(string) {
    var arr, res;
    res = "";
    arr = string.split(" ");
    var i = 0;
    for (var i in arr) {
        if (typeof i != "undefined") {
            res += arr[i][0].toUpperCase()+ arr[i].slice(1); // Capitalize first letter
        }
    }
    return res;
}

/**
 * Init
 * 
 * Notice the user that a init function needs to be added for controlling the triggers
 */
Jss.prototype.init = function(func) {
    if (JssService.dev) {
        console.info(this.moduleName + ": Add a prototype.init function to add triggers and stuff")
    }
}

/**
 * Set element
 * Add a domElement to `this`
 */
Jss.prototype.setElement = function(element) {
    if (typeof element == "undefined") {
        if (JssService.dev) {
            return console.error("First parameter of setElement needs to be a domElement");
        }
    }
    this.element = element;
}

/**
 * Checks if parameter is a valid action, and logs an error when not.
 *
 * Returns Boolean
 */
Jss.prototype.validateAction = function(request) {
    var result;
    for (var action in this.actions) {
        if (this.actions[action].indexOf(request.toLowerCase()) > -1) {
            result = action;
            break;
        }
    }
    if (result) {
        return result;
    } else {
        console.error("validateAction: unknown request", request);
        return false;
    }
}

/**
 * Adds an action to the object, list of possible actions can be found in Jss.actions
 */
Jss.prototype.addAction = function(request, fn, d) {

    var self = this;
    var action = self.validateAction(request)
    var element = self.element;

    // {bool}, if true, this adds the default classes
    if (d == false && typeof d !== "undefined") {
        d = false;
    } else {
        d = true;
    }

    switch (action) {

        case "click":
            element.addEventListener("click", fn);
            if (d) { // Default classes
            element.addEventListener("click", function(){self.setState("Clicked") } );
            window.addEventListener( "click", function(event) { if (event.target != self.element && self.hasState("Clicked")) {self.removeState("Clicked")} }  );
            }
        break;

        case "hover":
            element.addEventListener("mouseover", fn , false);
            if (d) { // Default classes
            element.addEventListener("mouseover", function(){self.setState("Hover")} );
            element.addEventListener("mouseout",  function(){self.removeState("Hover")} );
            }
        break;
    }

    return false;
}