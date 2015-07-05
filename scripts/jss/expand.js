'use strict'




var Expand = function(element) {
    var self = this;
    this.moduleName = "expand";

    this.element    = element;
    this.moduleName = false;
    this.triggers   = [];
    this.className  = "";

    // Possible Element ClassNames
    this.elementClass = [],
    this.triggerClass = "",
    this.targetClass  = "",

    this.target = {
        element: undefined,
        className: "",
        init: function(element){
            this.element = element;
            this.className = element.className
        }
    }

    this.trigger = {
        element: undefined,

        init: function(element){
            this.element = element;
            this.className = element.className


            self.className += self.elementClass[0];
            self.trigger.className += self.triggerClass;
            self.target.className  += self.targetClass;


            element.addEventListener("click", function(){
                self.trigger.changeStatus();
            });
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

    this.init(element);
}


Expand.prototype = Object.create(Jss.prototype);
Expand.prototype.constructor = Expand;









var jssModules = ["expand", "test"];
var allElements = document.getElementsByTagName("*");
var test = [];
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
                    test.push(new Expand(element, className));
                    break;

                    case 'test':
                    test.push(new Test(element));
                    break;
                }
            }
        }
    }
}

console.log("test",test);