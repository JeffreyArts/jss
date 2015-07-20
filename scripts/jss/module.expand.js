'use strict'




var Expand = function(element) {
    var self = this;
    self.moduleName = "expand";

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


