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

'use strict'


var Jss = function(element) {
}

Jss.prototype.element = undefined;
Jss.prototype.state = undefined;
Jss.prototype.events = undefined;
Jss.prototype.actions = {
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};

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


Jss.prototype.init = function(element, func) {
    var trigger;
    this.element = element;

    this.triggers = this.findActions();

    if (this.triggers.length > -1) {
        for (var i = 0; i < this.triggers.length; i++) {
            trigger = this.triggers[i];
            if (typeof this[trigger.name] == "object") {
                this[trigger.name].init(trigger.element);
            }
        }
    }
/*
        console.log(typeof(func));
    this.element.className += this.elementClass[0];
    //this.trigger.element.className += this.triggerClass;
    //this.target.element.className  += this.targetClass;
*/
    if (typeof func =="function") {
        func();
    }
}

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

Jss.prototype.addAction = function(request, fn) {

    var self = this;
    var action = self.validateAction(request)

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

Jss.prototype.findActions = function() {
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
                            res.push({
                                name: className.replace(this.moduleName + "--",""),
                                element: triggerElement
                            })
                        }
                    }
                }
            }
        }
    }

    return res;
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

'use strict'




var Expand = function(element) {
    var self = this;
    self.moduleName = "expand";
    self.init(element)

    self.target = {
        init: function(element){
            self.target.element = element;
        }
    }

    self.trigger = {
        init: function(element){
            trigger.element = element;

            self.trigger.setState("Open");
            target.setState("Active");

            self.trigger.addAction("click", function(){
                self.trigger.changeStatus();
            });
        },

        // Expand Trigger specific
        changeStatus: function() {
/*
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
            }*/
        }
    }

    this.init(element);
}


Expand.prototype = Object.create(Jss.prototype);
Expand.prototype.constructor = Expand;









var jssModules = ["expand", "test"];
var allElements = document.getElementsByTagName("*");
var test = [];
var tmp;
for (var i=0; i < allElements.length; i++) {
    // Do something with the element here
    var element = allElements[i];
    var classNames = element.className.split(" ");

    if (classNames.length > -1) {
        for (var ii in classNames) {
            var className = classNames[ii];
            if (jssModules.indexOf(className) > -1) {
                // Create object
                switch (className) {
                    case 'expand':
                        tmp = new Expand(element);
                        tmp.init(element);
                        test.push(tmp);
                    break;

                    case 'test':
                        tmp = new Test(element);
                        tmp.init(element);
                        test.push(tmp);
                    break;
                }
            }
        }
    }
}

console.log("test",test);

var Test = function(element) {
    var self = this;
    self.moduleName = "test";
    self.init(element)


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

    })
}

Test.prototype = Object.create(Jss.prototype);
