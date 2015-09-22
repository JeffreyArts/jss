
/**
 * -----------------------------------------------------------------------------
 * Get data attribute value
 * -----------------------------------------------------------------------------
 * Returns the value of the requested attribute. Search first for a data-[ATTRIBUTE] value
 * If not found, it checks for the attribute in the default object. When that is not being
 * found neither, the normal this[attribute] value is being returned.
 *
 * @param {string} attribute                                                    The NAME of the data attribute (data-NAME)
 * @return {string}                                                             The value of the given attribute
 */
Jss.prototype.getDataAttribute = function(attribute){

    var result = undefined;

    if (typeof this.element.dataset[attribute] !== "undefined") {
        result = this.element.dataset[attribute];
    } else if (typeof this[attribute] === "undefined" && typeof this.default === "object") {
        result = this.setDataAttribute(attribute, this.default[attribute]);
    }

    return this[attribute] = result;
}


/**
 * -----------------------------------------------------------------------------
 * Update data
 * -----------------------------------------------------------------------------
 * Set the value to the given attribute. And updates the data-[ATTRIBUTE] value
 *
 * @param {string} attribute                                                    The NAME of the data attribute (data-NAME="value")
 * @param {string} value                                                        The VALUE of the data attribute (data-name="VALUE")
 * @return {undefined}
 */

Jss.prototype.setDataAttribute = function(attribute, value) {

    // Update this.value + executing the binded function (if a function is binded)
    this.setData(attribute, value);

    // Update data attribute
    if (typeof value !== "undefined") {
        this.element.dataset[attribute] = this[attribute];
    } else {
        delete this.element.dataset[attribute];
    }
}

