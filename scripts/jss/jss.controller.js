/**
 * -------------------------------
 * JssController is being called when the the document is ready and contains all modules which are found in the DOM.
 * -------------------------------
 *
 * @type {Object}   Main object for the framework
 */
var  JssController = {};
JssController.modules 		    = []; // Result array with objects of all the found modules
JssController.activeModules 	= JssService.activeModules;

/**
 * -------------------------------
 * Find modules
 * -------------------------------
 *
 * Search within the target domElement for domElements with a classname wich equals a string in the activeModules array
 *
 * @param {domElement} target
 * @return {array}                                                              Array of all the found modules in target
 */
JssController.findModules = function(target) {
    if (typeof target !== 'object') {
        target = document;
    }

    var allElements = target.getElementsByTagName("*");                       // Array with all domElements
    var test = [];
    var self = this;
    var foundModules = [];


    var addActiveModule = function(module){
        if (JssService.isModule(element, module)) {
            tmp = eval("new " + JssService.toCamelCase(module) + "(element)"); // Dynamicly load modules

            tmp.setElement(element);                                        // Add the domElement to the module
            tmp.findTriggers();			                                    // Search for module triggers

            tmp.init();					                                    // Executes everything within the init function
            foundModules.push(tmp);
        }
    };

    // No child element has been found.
    if (allElements.length <= 0) {
        return [];
    }

    for (var i=0; i < allElements.length; i++) {

        // Set default vars //
        var element = allElements[i];                                           // Specific domElement
        var tmp = false;

        // Loop through the (active) modules array and add/instantiate them
        self.activeModules.forEach( addActiveModule ); // End forEach
    }
    // Return the amound of found modules
    return foundModules;
};

document.addEventListener('DOMContentLoaded', function() {
    JssController.modules = JssController.findModules();
    console.log(JssController);
});
