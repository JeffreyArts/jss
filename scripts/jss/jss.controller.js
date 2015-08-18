
var  JssController = {};
JssController.modules 		= []; // Result array with objects of all the found modules
JssController.activeModules 	= JssService.activeModules;

JssController.findModules = function() {
    var allElements = document.getElementsByTagName("*");                       // Array with all domElements
    var test = [];
    var self = this;
    for (var i=0; i < allElements.length; i++) {

        // Set default vars //
        var element = allElements[i];                                           // Specific domElement
        var tmp = false;

        // Loop through the (active) modules array and add/instantiate them
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

                tmp.findTriggers();			                                    // Search for module triggers

                tmp.moduleName = module;                                        // Set defauls for moduleName
                tmp.init();					                                    // Executes everything within the init function
                self.modules.push(tmp);

            }
        }); // End forEach
    }
}

    JssController.findModules();
    console.log(JssController);