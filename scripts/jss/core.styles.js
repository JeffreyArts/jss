/*******************************************************************************

    Styles

*******************************************************************************/

/**
 * -----------------------------------------------------------------------------
 * Set height
 * -----------------------------------------------------------------------------
 * Sets the height of the `this.element` by the given input (height)
 *
 * @param  {number} height                                                      The height in pixels or percentage. Where numbers will be calculated to pixels so giving a height of 50 will result in a height of "50px". If you want percentages pass the variable with a percentage sign 50 + "%"
 * @return {boolean}                                                            True if setting the height was succesfull, otherwise false.
 */
Jss.prototype.setHeight = function(height) {
    if (typeof height === "number") {
        height += "px";
    }

    if (typeof height !== "string") {
        throw("parameter height needs to be a string or integer");
    }

    this.element.style.height = height;
    return true;
}

/**
 * -----------------------------------------------------------------------------
 * Get height
 * -----------------------------------------------------------------------------
 * Returns the height of the `this.element`
 *
 * @return {number}                                                             The height of the element in pixels
 */
Jss.prototype.getHeight = function() {
    return this.element.offsetHeight;
}

/**
 * -----------------------------------------------------------------------------
 * Set width
 * -----------------------------------------------------------------------------
 * Sets the width of the `this.element` by the given input (width)
 *
 * @param  {number} width                                                       The width in pixels or percentage. Where numbers will be calculated to pixels so giving a width of 50 will result in a width of "50px". If you want to set a percentage, just pass the variable with a percentage sign ("50%")
 * @return {boolean}                                                            True if setting the height was succesfull, otherwise false.
 */
Jss.prototype.setWidth = function(width) {
    if (typeof width == "number") {
        width += "px";
    }

    if (typeof width !== "string") {
        throw("parameter width needs to be a string or integer");
    }
    this.element.style.width = width;
    return true;
}


/**
 * -----------------------------------------------------------------------------
 * Get width
 * -----------------------------------------------------------------------------
 * Returns the width of the `this.element`
 *
 * @return {number}                                                             The width of the element in pixels
 */
Jss.prototype.getWidth = function() {
    return this.element.offsetWidth;
}