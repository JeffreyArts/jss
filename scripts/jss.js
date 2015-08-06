'use strict'

/*
    Modules & Triggers extend the default JSS class
 */


var Jss = function(element) {};

Jss.prototype.element = undefined;                                              // {obj} domElement
Jss.prototype.state = undefined;                                                // {str} State of module, is reflected by the css class __isState

Jss.prototype.actions = {
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};

Jss.prototype.modules = []; // Result array with objects of all the found modules
Jss.prototype.activeModules = [
    "expand",
    "test",
];

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


Jss.prototype.init = function(func) {
    // var trigger;
    // this.triggers = [];
    //
    // if (this.triggers.length > -1) {
    //     for (var i = 0; i < this.triggers.length; i++) {
    //         trigger = this.triggers[i];
    //         if (typeof this[trigger.name] == "object") {
    //             this[trigger.name].init(trigger.element);
    //         }
    //     }
    // }

    if (typeof func =="function") {
        func();
    }
}

Jss.prototype.setElement = function(element) {
    if (typeof element == "undefined") {
        return console.error("First parameter of setElement needs to be a domElement");
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
Jss.prototype.addAction = function(request, fn) {

    var self = this;
    var action = self.validateAction(request)
    var element = self.element;

    switch (action) {

        case "click":
            element.addEventListener("click", fn);

            element.addEventListener("click", function(){self.setState("Clicked") } );
            window.addEventListener( "click", function(event) { if (event.target != self.element && self.hasState("Clicked")) {self.removeState("Clicked")} }  );
        break;

        case "hover":
            element.addEventListener("mouseover", fn , false);

            element.addEventListener("mouseover", function(){self.setState("Hover")} );
            element.addEventListener("mouseout",  function(){self.removeState("Hover")} );
        break;
    }

    return false;
}


//¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
//  External Jss helper functions
//______________________________________________


Jss.prototype.findTriggers = function(element) {
    if (typeof element == "undefined") {
        element = this.element;
    }
    //console.log(element);
    var res = [];
    var elementTriggers = element.getElementsByTagName("*");
    if (elementTriggers.length > -1) {
        for (var i in elementTriggers) {
            var triggerElement = elementTriggers[i];

            if (typeof triggerElement == "object") {
                var tmp = triggerElement.className.split(" ");
                if (tmp.length > -1) {
                    for (var ii in tmp) {
                        var className = tmp[ii];
                        if (className.indexOf(this.moduleName + "--") > -1) {
                            var triggerName = className.replace(this.moduleName + "--", "");
                            this[triggerName] = new JssModule();
                        }
                    }
                }
            }
        }
    }
    return res;
}

Jss.prototype.findModules = function() {
    var allElements = document.getElementsByTagName("*");                       // Array with all domElements
    var test = [];
    var self = this;
    for (var i=0; i < allElements.length; i++) {

        // Set default vars //
        var element = allElements[i];                                           // specific domElement
        var tmp = false;

        // Loop through the (active) modules array and add/instantiate them //
        this.activeModules.forEach(function(module){
            if (element.className.indexOf(module)        > -1 &&
                element.className.indexOf(module + "_") == -1 &&
                element.className.indexOf(module + "-") == -1)
            {
                switch (module) {
                    case 'expand':
                        tmp = new Expand(element);
                    break;

                    case 'test':
                        tmp = new Test(element);
                    break;
                }
                tmp.setElement(element);

                // Module is created, now look for any module triggers
                // ... execute findTriggers function

                self.modules.push(tmp);

            }
        }); // End forEach
    }
}
Jss.prototype.removeClassName = function(data) {

    var classList  = [];

    // if (typeof this.moduleAction != "undefined" && this.moduleAction.length >= 0) {
    // }

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
    className       = this.moduleName + "__is" + state;

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
            this.removeClassName(this.moduleName + "" + this.moduleAction + "__is" + state);
        } else {
            this.removeClassName(this.moduleName + "__is" + state);
        }
    }
}

var JssTrigger = function(){};

JssTrigger.prototype.type               = "JssTrigger";
JssTrigger.prototype.setElement         = Jss.prototype.setElement;
JssTrigger.prototype.actions            = Object.create(Jss.prototype.actions);
JssTrigger.prototype.validateAction     = Jss.prototype.validateAction;
JssTrigger.prototype.addAction          = Jss.prototype.addAction;
JssTrigger.prototype.removeClassName    = Jss.prototype.removeClassName;
JssTrigger.prototype.addClassName       = Jss.prototype.addClassName;
JssTrigger.prototype.setState           = Jss.prototype.setState;
JssTrigger.prototype.hasState           = Jss.prototype.hasState;
JssTrigger.prototype.removeState        = Jss.prototype.removeState;


var JssModule = function(){};

JssModule.prototype         = Object.create(Jss.prototype);
JssModule.prototype.type    = "JssModule"

var Test = function(element) {

    //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    //  Module defaults
    // _________________________________________

    var self = this;
    self.moduleName = "test";
    self.setElement(element);
    self.init(function(){
        console.log("Test module added");
    })



    //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    //  Module customs
    // _________________________________________

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



Test.prototype = Object.create(JssModule.prototype);
'use strict'




var Expand = function(element) {

    //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    //  Module defaults
    // _________________________________________

    var self = this;
    self.moduleName = "expand";
    self.setElement(element);
    self.init(function(){
        console.log("Expand module added");
    })



    //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    //  Module customs
    // _________________________________________

    /*self.init(function(){
        console.log(self.trigger, self);
        self.target.variablenaam = "Example";
        self.trigger.asdf = "Example";
        self.triggers = {
            a:"a"
        }
    })*/


/*
    self.trigger = {
        init: function(element){
            self.trigger.element = element;

            /*self.trigger.setState("Open");
            target.setState("Active");

            self.trigger.addAction("click", function(){
                self.trigger.changeStatus();
            });*/
/*
        },

        // Expand Trigger specific
        changeStatus: function() {
            var triggerClasses     = self.trigger.element.className
            var targetClasses      = self.target.element.className
            var selfClasses        = self.element.className

            if (selfClasses.indexOf("isClosed") > -1) {
                self.removeStatus();
                self.element.className = self.setState("open");

                self.trigger.element.className = triggerClasses.replace(self.triggerClass,  "");
                self.target.element.className = targetClasses.replace(self.targetClass,  "") + self.targetClass;
            } else {
                self.element.className  = selfClasses.replace(   self.elementClass[0],  self.elementClass[1]);
                self.trigger.element.className  = triggerClasses.replace(self.triggerClass, "") + self.triggerClass;
                self.target.element.className   = targetClasses.replace(self.targetClass,  "");
            }
        }
    }
*/
}


Expand.prototype = Object.create(JssModule.prototype);
Expand.prototype.constructor = Expand;



var jssController = new Jss();
    jssController.findModules();
    console.log(jssController);