/**
 * -----------------------------------------------------------------------------
 * Class name prefix
 * -----------------------------------------------------------------------------
 * The prefix equals the modulename, or - when it's a trigger object - modulename--triggername
 *
 * @return {string} The classname
 */
Jss.prototype.classNamePrefix = function() {
    if (this.type == "JssTrigger") {
        return this.moduleName + "--" + this.triggerName;
    } else {
        return this.moduleName;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Remove class name
 * -----------------------------------------------------------------------------
 * Removes the `this.element` classname
 * 	- "all" || undefined        > Removes ALL classnames
 *  - "allStates" || "states"   > Remove all STATES
 *  - all other strings remove that specific string from the className
 *
 * @param {string} input                                                        The classname (case-sensitive) which needs to be removed
 * @return {undefined}
 */
Jss.prototype.removeClassName = function(input) {

    var classList  = [];

    if (input == "all" || typeof input == "undefined") {

        this.element.className = "";

    } else if (input == "states" || input == "allStates") {

        classList = this.element.className.split(" ");
        for (var i in classList) {
            className = classList[i];
            if (className.indexOf("__is") > -1) {
                delete classList[i];
            }
        }
        this.element.className = classList.join(" ");

    } else if(typeof input == "string") {
        this.element.className = this.element.className.replace(input,"");
    } else {
        console.error("removeClassName: parameter should be a string");
    }
}

/**
 * -----------------------------------------------------------------------------
 * Add class name
 * -----------------------------------------------------------------------------
 * Adds a class name by string or array.
 * Does NOT check for duplicates
 *
 * @param  {string} name                                                        The classname to be added
 * @return {boolean} true on succes, false if an error occurs
 */
Jss.prototype.addClassName = function(className) {
    // If this.element is not a domElement, then we can not set it's classname...
    if (typeof this.element == "undefined") {
        return false;
    }

    if (Array.isArray(name)) {
        className = className.join(" ");
    }

    this.element.className += " ";
    if (typeof name == "string") {
        this.element.className += className;
        return true;
    }
    return false;
};
