'use strict'

var JssService = {};

// Edit this array to enable or disable modules
JssService.activeModules   = [
    "expand",
    "test",
]
JssService.dev             = true;

/**************************
*
*   Below are core properties defined, becarefull when you think of changing these...
* 
**************************/


JssService.actions = {
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};

JssService.forbiddenProperties = [
    'type',
    'triggers',
    'addTrigger',
    'findTriggers',
    'toCamelCase'
];

/**
 * Is Module
 * 
 * @return {Boolean} true if element is a module, otherwise false
 */
JssService.isModule = function(element, module) {
    var arr = element.className.split(" ");
    var found = false;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(module)        > -1 &&
            arr[i].indexOf(module + "_") == -1 &&
            arr[i].indexOf(module + "-") == -1)
        { 
            found = true;
            break;
        }
    } 
    return found;
}


/**
 * Is Trigger
 * 
 * @return {Boolean} true if element is a module, otherwise false
 */
JssService.isTrigger = function(element, module) {
    if (element.className.indexOf(module + "--") > -1) { 
        return true;
    } else {
        return false;
    }
}

JssService.getTriggerName = function(element, module) {
    // As an example we assume that the value of element.className == 'a module--triggerName'

    var startPos = element.className.indexOf(module + "--");                        // 2       
    var sliced = element.className.slice(startPos, element.className.length )       // 'module--triggerName'
    var endPos = sliced.indexOf(" ");                                               // -1       // not found
    if (endPos != -1) {                                                             // 19
        sliced = sliced.slice(0,endPos);                                            // if there is more after the string, this will remove it
    }
    return sliced.replace(module + "--","")
}

/**
 * Trigger name is allowed 
 *
 * Checks if the triggername is allowed, returns a boolean and throws error if it is not allowed 
 */
JssService.triggerNameIsAllowed = function(element, module) {
    if (JssService.forbiddenProperties.indexOf(this.getTriggerName(element, module)) > -1) {
        // This triggerName is a core property, throw error
        console.error('Triggername `' + getTriggerName(element,module) + '` is not allowed. Change the trigger so it does not corresponds any of these: ' + JssService.forbiddenProperties) 
        return false;
    } 
    return true;
}
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
// 'use strict'
// 
// 
// For later use...

// var JssModule = function(element, options) {
//     this.type = "JssModule";
//     this.setElement(element);

//     if (typeof options === "object") {
//         if (typeof options.module === "object") {
//             this.module = options.module;
//         }
//     }
// }

// JssModule.prototype = Object.create(Jss.prototype);

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

Jss.prototype.classNamePrefix = function(data) {
    if (this.type == "JssTrigger") {
        return this.moduleName + "--" + this.triggerName;
    } else {
        return this.moduleName;
    }
}
Jss.prototype.removeClassName = function(data) {

    var classList  = [];

    if (data == "all" || typeof data == "undefined") {

        this.element.className = "";

    } else if (data == "states" || data == "allStates") {

        classList = this.element.className.split(" ");
        for (var i in classList) {
            className = classList[i];
            if (className.indexOf("__is") > -1) {
                delete classList[i];
            }
        }
        this.element.className = classList.join(" ");

    } else if(typeof data == "string") {
        this.element.className = this.element.className.replace(data,"");
    }
}


Jss.prototype.addClassName = function(data) {
    this.element.className += " ";
    if (typeof data == "string") {
        this.element.className += data;
    } else {
        this.element.className += data.join(" ")
    }
}


Jss.prototype.setState = function(string) {
    var element, verifiedState, state, className;

    element         = this.element;
    state           = this.toCamelCase(string);
    className       = this.classNamePrefix() + "__is" + state;
    // Check if this.state is an array, and make it one if not.
    if (Array.isArray(this.state) == false ) {
        this.state = [];
    }

    // This if statement prevents that the same state is being set twice or more
    if ( !this.hasState(string) ) {
        this.addClassName(className)
        this.state.push(state);
    }
}


Jss.prototype.hasState = function(string) {
    if (typeof this.state == "object" && this.state.indexOf(string) >= 0) {
        return true;
    } else {
        return false;
    }
}



Jss.prototype.removeState = function(str) {

    var state      = this.toCamelCase(str);
    var stateIndex = this.state.indexOf(state);

    if (str == "all" || typeof str == "undefined") {
        this.removeClassName("states");
    } else {
        this.state.splice(stateIndex, 1);
        if (typeof this.moduleAction != "undefined" && this.moduleAction.length > -1) {
            this.removeClassName(this.classNamePrefix() + "" + this.moduleAction + "__is" + state);
        } else {
            this.removeClassName(this.classNamePrefix() + "__is" + state);
        }
    }
}


var Test = function(element) {

    //----------------------------------------------
    //  Module defaults
    //----------------------------------------------

    var self = this;
    self.moduleName = "test";
    self.setElement(element);

    //----------------------------------------------
    //  Module customs
    //----------------------------------------------

    self.lightSwitch = false;

    self.addAction('click',function(){

        if (self.lightSwitch) {
            self.setState("Closed");
            self.removeState("Open");
            self.lightSwitch = false;
        } else {
            self.setState("Open");
            self.removeState("Closed");
            self.lightSwitch = true;
        }
    })
    self.addAction('hover',function(){

    });
}



Test.prototype = Object.create(Jss.prototype);
'use strict'




//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Expand = function(element) {

    var self = this;
    self.moduleName = "expand";
    self.setElement(element);
}


Expand.prototype = Object.create(Jss.prototype);


//------------------------------------------
//  Module customs
//------------------------------------------


Expand.prototype.init = function(){
    var expand = this;
    expand.status = true;

    this.addTrigger("trigger", function(trigger) {
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
        }, false)
    });
}

var JssController = function(element) {};

JssController.prototype.modules 		= []; // Result array with objects of all the found modules
JssController.prototype.activeModules 	= JssService.activeModules;

JssController.prototype.findModules = function() {
    var allElements = document.getElementsByTagName("*");                       // Array with all domElements
    var test = [];
    var self = this;
    for (var i=0; i < allElements.length; i++) {

        // Set default vars //
        var element = allElements[i];                                           // specific domElement
        var tmp = false;

        // Loop through the (active) modules array and add/instantiate them //
        self.activeModules.forEach(function(module){

            if (JssService.isModule(element, module)) {
                switch (module) {
                    case 'expand':
                        tmp = new Expand(element);
                    break;

                    case 'test':
                        tmp = new Test(element);
                    break;
                }
                
                tmp.findTriggers();			// Search for module triggers
                tmp.moduleName = module;    // Set defauls for moduleName
                tmp.init();					// Executes everything within the init function
                self.modules.push(tmp);

            }
        }); // End forEach
    }
}

var jssController = new JssController();
    jssController.findModules();
    console.log(jssController);