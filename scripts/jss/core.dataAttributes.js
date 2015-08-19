/**
 * -----------------------------------------------------------------------------
 * Get data
 * -----------------------------------------------------------------------------
 * Returns the value of the requested attribute. Search first for a data-[ATTRIBUTE] value
 * If not found, it checks for the attribute in the default object. When that is not being
 * found neither, the normal this[attribute] value is being returned.
 *
 * @return {string} the value of the given attribute
 */
Jss.prototype.loadData = function(attribute){

    var result = false;

    if (typeof this.element.dataset[attribute] !== "undefined") {
        result = this.element.dataset[attribute];
    } else if (typeof this[attribute] === "undefined" && typeof this.default === "object") {
        result = this.updateData(attribute, this.default[attribute]);
    } else {
        result = this[attribute];
        console.error("getData: The requested attribute `" + attribute + "` is not defined. Return undefined instead");
    }

    return this[attribute] = result;
}

/**
 * -----------------------------------------------------------------------------
 * Update data
 * -----------------------------------------------------------------------------
 * Set the value to the given attribute. And updates the data-[ATTRIBUTE] value
 *
 * @return {undefined} -
 */

Jss.prototype.updateData = function(attribute, value, fn){
    this[attribute] = value;
    if (typeof value !== "undefined") {
        this.element.dataset[attribute] = this[attribute];

        if (typeof fn === "function") {                                         // Use this third parameter to add functionality whenever a data attribute is updated
            fn();
        }
    } else {
        delete this.element.dataset[attribute];
    }
}
