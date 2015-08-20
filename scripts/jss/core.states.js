/**
 * -----------------------------------------------------------------------------
 * Set State
 * -----------------------------------------------------------------------------
 * This updates the state of the object. States are being added to the class name prefix with a double underscore.
 * If you would have the module `envelope` and give it the state `open`. The class name `envelope__open` will be added.
 * Whenever you remove the state `open`, the according class name will be removed as well.
 *
 * @param  {string}
 * @return {boolean}                                                            True on success, otherwise false (might already have the state)
 */
Jss.prototype.setState = function(string) {
    var element, verifiedState, state, className;

    element         = this.element;
    state           = JssService.toCamelCase(string);
    className       = this.classNamePrefix() + "__is" + state;
    // Check if this.state is an array, and make it one if not.
    if (Array.isArray(this.state) == false ) {
        this.state = [];
    }

    // This if statement prevents that the same state is being set multiple times
    if ( !this.hasState(string) ) {
        this.addClassName(className)
        this.state.push(state);
        return true;
    } else {
        return false;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Has state
 * -----------------------------------------------------------------------------
 * Checks if the parameter is already a state and returns true if so. Otherwise false.
 *
 * @param  {string}
 * @return {boolean}                                                            True if it has the given state, otherwise false
 */
Jss.prototype.hasState = function(string) {
    if (typeof this.state == "object" && this.state.indexOf(string) >= 0) {
        return true;
    } else {
        return false;
    }
}


/**
 * -----------------------------------------------------------------------------
 * Remove state
 * -----------------------------------------------------------------------------
 * Removes the state from the states array, and from the element.className
 *
 * @param  {string}                                                             The name of the state which should be removed
 * @return {undefined}
 */
Jss.prototype.removeState = function(str) {

    var state      = JssService.toCamelCase(str);
    var stateIndex = this.state.indexOf(state);

    if (str == "all" || typeof str == "undefined") {
        this.removeClassName("states");
    } else {
        this.state.splice(stateIndex, 1);
        if (typeof this.moduleAction != "undefined" && this.moduleAction.length > -1) {
            this.removeClassName(this.classNamePrefix() + "" + this.moduleAction + "__is" + state);
        } else {
            this.removeClassName(this.classNamePrefix() + "__is" + state);
        }
    }
}
