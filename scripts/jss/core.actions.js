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
    request = this.getActionElement(request).request
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
    var actions     = [];
    var t = self.getActionElement(request);
    var element     = t.element;
    var request     = t.request;
    t = undefined;

    // Options
    var addDefaults = JssService.getOption("addDefaults", options);



    switch (action) {

        case "resize":

            actions.push(element.addEventListener("resize", fn));

        break;

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

        case "mouseIn":

            actions.push(element.addEventListener("mouseenter", fn , false));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("mouseenter", function(){
                    self.setState("MouseIn")
                    setTimeout(function(){self.removeState("MouseIn")}, JssService.enterDelay)

                } , false));
            }
        break;

        case "mouseOut":

            actions.push(element.addEventListener("mouseleave", fn , false));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("mouseleave", function(){
                    self.setState("MouseOut")
                    console.log("ASDF");
                    setTimeout(function(){self.removeState("MouseOut")}, JssService.enterDelay)

                } , false));
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

/**
 * -----------------------------------------------------------------------------
 * Get action element
 * -----------------------------------------------------------------------------
 * @param  {string}                                                             The request
 * @return {object}                                                             An object with 2 properties: request && element
 */
Jss.prototype.getActionElement = function(request) {
    var self = this;
    var prefix = false;
    var newRequest  = request;
    var element = self.element;
    // Set prefix if it exists
    if (request.indexOf(".") > 0) {
        var t       = request.split("."),
        newRequest  = t[1];
        prefix      = t[0];
        t = undefined;
    }

    // Update element according the prefix (or skip it, if not set)
    if (prefix !== false) {
        switch (prefix) {
            case "screen":
            case "window":
                element = window;
            break;
        }
    }

    // Return object
    return {
        request: newRequest,
        element: element
    }
}