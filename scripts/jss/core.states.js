
Jss.prototype.setState = function(string) {
    var element, verifiedState, state, className;

    element         = this.element;
    state           = this.toCamelCase(string);
    className       = this.classNamePrefix() + "__is" + state;
    // Check if this.state is an array, and make it one if not.
    if (Array.isArray(this.state) == false ) {
        this.state = [];
    }

    // This if statement prevents that the same state is being set twice or more
    if ( !this.hasState(string) ) {
        this.addClassName(className)
        this.state.push(state);
    }
}


Jss.prototype.hasState = function(string) {
    if (typeof this.state == "object" && this.state.indexOf(string) >= 0) {
        return true;
    } else {
        return false;
    }
}



Jss.prototype.removeState = function(str) {

    var state      = this.toCamelCase(str);
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
