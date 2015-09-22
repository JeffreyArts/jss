/**
 * List where the keys corresponds with this[key], and where the value is the function to be executed when the var is changed.
 */
Jss.prototype.watchList = {};


/**
 * -----------------------------------------------------------------------------
 * Add data
 * -----------------------------------------------------------------------------
 * Add a (default) value for the given attribute.
 *
 * @param {string} attribute                                                    The name of the attribute (this[attribute])
 * @param {*} value                                                             The value of this[attribute], could be anything...
 * @param {function} fn                                                         The function which should be executed when updating this data attribute
 */
Jss.prototype.addData = function(attribute, value, fn){
    if (typeof fn === "function") {
        watchList[key] = fn;
    }
    if (JssService.forbiddenProperties.indexOf(attribute) === -1) {
        return this[attribute] = value;
    } else {
        console.error("Could not set property `" + attribute + "` because it is a forbidden property. See JssService.forbiddenProperties for the entire list.");
        return false;
    }
}



/**
 * -----------------------------------------------------------------------------
 * Set data
 * -----------------------------------------------------------------------------
 *
 * @param {string} attribute
 * @param {*} value
 * @param {object} options
 *        				- dataAttribute {boolean}
 *        				- ajax {string} url
 */
Jss.prototype.setData = function(attribute, value, options) {

    this[attribute] = value;

    if (typeof this.watchList[attribute] === "function") {                  // Use the watchlist to add functionality whenever a data attribute is updated
        this.watchList[attribute]();
    }
}


/**
 * -----------------------------------------------------------------------------
 * Get data
 * -----------------------------------------------------------------------------
 *
 * @param {string} attribute
 * @param {*} value
 * @param {object} options
 *        				- dataDefault {boolean}
 *        				- dataAttribute {boolean}
 *        				- dataAjax {string} url
 */
Jss.prototype.getData = function(attribute, options) {
    if (typeof options === "object") {
        if (options.dataAttribute) {
            // Load Attribute value
            this[attribute] = this.getDataAttribute(attribute)
        } else if (options.dataDefault) {
            // Load Default value
            this[attribute] = this.default[attribute];
        } else if (typeof options.dataAjax === "string") {
            // Make a AJAX GET call
            this[attribute] = this.getDataAjax(options.dataAjax, attribute)
        }
    } else {
        this[attribute] = this.getDataAttribute(attribute)
    }

    return this[attribute];
}