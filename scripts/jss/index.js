'use strict'


var Jss = function(element) {
    /*this.element    = element;
    this.stateList = {
        hidden: "isNinja",
        active: "isActive",
        open: "isOpen",
        closed: "isClosed",
        hover: "isHover",
        click: "isClicked",
    };
    this.state = undefined;*/
}

Jss.prototype.element = undefined;
Jss.prototype.state = undefined;
Jss.prototype.actionList = {
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};
Jss.prototype.stateList = {
    hidden: "isNinja",
    active: "isActive",
    open: "isOpen",
    closed: "isClosed",
    hover: "isHover",
    click: "isClicked",
};



Jss.prototype.setState = function(string) {
    var element, verifiedState, state, className;

    element         = this.element;
    state           = string.toLowerCase();
    verifiedState   = this.stateList[string.toLowerCase()];
    className       = this.moduleName + "__" + state;

    if (typeof verifiedState != "string") {
        console.error("`" + verifiedState + "` is not a possible state. Try one of these instead: ", this.stateList)
        return false;
    }

    // This if statement prevents that the same state is being set twice or more
    if (element.className.indexOf(className) <= 0) {
        this.addClassName(className)
        this.state = state;
        this.removeState("all");
    }
    console.log(this.state);
}



Jss.prototype.removeState = function(string) {
    var classList;

    classList = [this.moduleName];
    if (typeof this.moduleAction != "undefined" && this.moduleAction.length >= 0) {
        this.classList.push(this.moduleName + "--" + this.moduleAction)
    }

    if (string == "all" || typeof string == "undefined") {
        this.removeClassName();
        this.addClassName(classList);
    }
    console.log(this);
}

Jss.prototype.removeClassName = function(data) {
    if (data == "all" || typeof data == "undefined") {
        this.element.className = "";
    } else if(typeof data == "string") {


        for (var index in this.stateList) {
            state = this.stateList[index];
            if (string == state) {
                this.element.className.replace(this.moduleName + "--" + this.moduleAction + "__" + state,"");
                this.element.className.replace(this.moduleName + "__" + state,"");
                this.element.className.replace("__" + state,"");
            }
        }
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


Jss.prototype.init = function(element, func) {
    var trigger;
    this.element = element;
/*
    // Default classNames
    this.elementClass = [" " + this.moduleName + "__isOpen", " " + this.moduleName + "__isClosed"],
    this.triggerClass = " " + this.moduleName +"--trigger__isActive",
    this.targetClass  =  " " + "isNinja",

    this.triggers = this.findActions();

    if (this.triggers.length > -1) {
        for (var i = 0; i < this.triggers.length; i++) {
            trigger = this.triggers[i];
            if (typeof this[trigger.name] == "object") {
                this[trigger.name].init(trigger.element);
            }
        }
    }
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
    for (var action in this.actionList) {
        if (this.actionList[action].indexOf(request.toLowerCase()) > -1) {
            result = action;
            break;
        }
    }
    return result;
}

Jss.prototype.addAction = function(request, funcAction) {
    var action = this.validateAction(request)
    switch (action) {
        case "click":
            element.addEventListener("click", funcAction);
        break;

    }
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