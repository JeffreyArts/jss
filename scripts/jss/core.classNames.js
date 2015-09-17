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
 * @param  {string} The classname to be added
 * @return {undefined}
 */
Jss.prototype.addClassName = function(data) {
    this.element.className += " ";
    if (typeof data == "string") {
        this.element.className += data;
    } else {
        this.element.className += data.join(" ")
    }
}
