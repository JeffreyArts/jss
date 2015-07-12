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