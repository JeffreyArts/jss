/*******************************************************************************

    Actions

    - validateAction(request)                                                   {string}
    - addAction(request, fn, addDefaults)                                       {string, function, boolean}

*******************************************************************************/
/**
 * -----------------------------------------------------------------------------
 *   Validate action
 * -----------------------------------------------------------------------------
 * Checks if parameter is a valid action, and logs an error when not.
 *
 * @return {boolean} true if a action is valid, otherwise false.
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
 * -----------------------------------------------------------------------------
 * 	 Add Action
 * -----------------------------------------------------------------------------
 * Adds an action to the object, list of possible requests can be found in Jss.actions
 * First argument is a string with the name of the request
 * Second argument is the function which should be triggered
 * Third argument is collection of options
 *
 * @return {boolean} true if a action is succesfully added, otherwise false.
 */
Jss.prototype.addAction = function(request, fn, options) {

    var self = this;
    var action = self.validateAction(request)
    var element = self.element;
    var succeeded = false;
    
    // Options
    var addDefaults = JssService.getOption("addDefaults", options);

    switch (action) {

        case "click":
            element.addEventListener("click", fn);
            if (addDefaults) {                                                  // Add defaults
            element.addEventListener("click", function(){self.setState("Clicked") } );
            window.addEventListener( "click", function(event) { if (event.target != self.element && self.hasState("Clicked")) {self.removeState("Clicked")} }  );
            }
            succeeded = true;
        break;

        case "hover":
            element.addEventListener("mouseover", fn , false);
            if (addDefaults) {                                                  // Add defaults
            element.addEventListener("mouseover", function(){self.setState("Hover")} );
            element.addEventListener("mouseout",  function(){self.removeState("Hover")} );
            }
            succeeded = true;
        break;
    }

    return succeeded;
}