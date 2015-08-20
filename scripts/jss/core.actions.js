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
 * @param {string}                                                              The name of the request
 * @return {boolean} true if a action is valid, otherwise false.
 */
Jss.prototype.validateAction = function(request) {
    var result;
    for (var action in JssService.actions) {
        if (JssService.actions[action].indexOf(request.toLowerCase()) > -1) {
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
 *
 * | Options
 * 		- addDefaults {boolean}                                                 True: add default classes, false: don't
 *
 * @param {string}                                                              The name of the request
 * @param {function}                                                            The function which should be triggered
 * @param {object}                                                              Options
 * @return {boolean} true if a action is succesfully added, otherwise false.
 */
Jss.prototype.addAction = function(request, fn, options) {

    var self        = this;
    var action      = self.validateAction(request)
    var element     = self.element;
    var actions     = [];

    // Options
    var addDefaults = JssService.getOption("addDefaults", options);
    console.log(request, addDefaults);
    switch (action) {

        case "click":
            actions.push(element.addEventListener("click", fn));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("click", function(){
                    self.setState("Clicked")
                }));
                actions.push(window.addEventListener( "click", function(event) {
                    if (event.target != self.element && self.hasState("Clicked")) {
                        self.removeState("Clicked")
                    }
                }));
            } // End addDefaults
        break;

        case "hover":
            actions.push(element.addEventListener("mouseover", fn , false));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("mouseover", function(){
                    self.setState("Hover")
                }));
                actions.push(element.addEventListener("mouseout",  function(){
                    self.removeState("Hover")
                }));
            }
        break;
    }

    this.actions

    if (actions.length > 0) {
        return true;
    } else {
        return false;
    }
}