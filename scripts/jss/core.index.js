'use strict'

/*
    Modules & Triggers extend the default JSS class
 */


var Jss = function(element) {};

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
    var element = self.element;
    console.log(self);
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
    var allElements = document.getElementsByTagName("*");
    var test = [];
    var self = this;
    for (var i=0; i < allElements.length; i++) {
        // Do something with the element here
        var element = allElements[i];
        var tmp = false;

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
                        console.log(element, "module found");
                        tmp = new Test(element);
                    break;
                }
                console.log(typeof tmp.setElement,typeof self.setElement);
                console.log(typeof tmp.addAction,typeof self.addAction);

                //tmp.setElement(element);
                //tmp.findTriggers();
                //tmp.init();

                self.modules.push(tmp);
            }

        });
        /*if (classNames.length > -1) {
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
        }*/
    }
}

