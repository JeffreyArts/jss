'use strict'


var Jss = function(element) {
    /*this.element    = element;
    this.statusList = {
        hidden: "isNinja",
        active: "isActive",
        open: "isOpen",
        closed: "isClosed",
        hover: "isHover",
        click: "isClicked",
    };
    this.status = undefined;*/
}

Jss.prototype.element = undefined;
Jss.prototype.status = undefined;
Jss.prototype.actionsList = {
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};
Jss.prototype.statusList = {
    hidden: "isNinja",
    active: "isActive",
    open: "isOpen",
    closed: "isClosed",
    hover: "isHover",
    click: "isClicked",
};



Jss.prototype.setStatus = function(string) {
    var element;

    element = this.element;
    if (typeof this.statusList[string.toLowerCase()] != "string") {
        console.warning("`" + string.toLowerCase() + "` is not a possible status. Try one of these instead: ", this.statusList)
    }

    var currentClasses = element.className.split(" ");
    console.log(currentClasses, string);
}



Jss.prototype.removeStatus = function(string) {
    var status;

    if (string == "all" || typeof string == "undefined") {
        this.removeClassName();
        this.addClassName([
            this.moduleName,
            this.moduleName + "--" + this.moduleAction,
        ]);
    }
    console.log(this);
}

Jss.prototype.removeClassName = function(data) {
    if (data == "all" || typeof data == "undefined") {
        this.element.className = "";
    } else if(typeof data == "string") {


        for (var index in this.statusList) {
            status = this.statusList[index];
            if (string == status) {
                this.element.className.replace(this.moduleName + "--" + this.moduleAction + "__" + status,"");
                this.element.className.replace(this.moduleName + "__" + status,"");
                this.element.className.replace("__" + status,"");
            }
        }
    }

}
Jss.prototype.addClassName = function(data) {
    this.element.className = "[ ";
    if (typeof data == "string") {
        this.element.className += data;
    } else {
        this.element.className = data.join(" ")
    }
    this.element.className += " ]";
}


Jss.prototype.init = function(element, func) {
    var trigger;

    this.element = element;
    this.className = element.className
    this.moduleName = "expand";

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

    if (typeof func =="function") {
        func();
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