/**
 * List where the keys corresponds with this[key], and where the value is the function to be executed when the var is changed.
 */
Jss.prototype.setterWatchList = {};
Jss.prototype.getterWatchList = {};


/**
 * -----------------------------------------------------------------------------
 * Add data
 * -----------------------------------------------------------------------------
 * Add a (default) value for the given attribute.
 *
 * @param {string} attribute                                                    The name of the attribute (this[attribute])
 * @param {*} value                                                             The value of this[attribute], could be anything...
 * @param {object} options
 *        			- fallback {array}                                          This array defines the fallback flow for getting and setting the attribute value
 *           		- setterWatchFunction {function}
 *           		- getterWatchFunction {function}
 */
Jss.prototype.addData = function(attribute, value, options) {


    // watchList[key] = fn;
    var fallback = JssService.getOption('fallback', options); // Returns an array
    var setterWatchFunction = JssService.getOption('setterWatchFunction', options); // Returns an array

    if (typeof setterWatchFunction === "function") {
        this.setterWatchList[attribute] = setterWatchFunction;
    }

    if (typeof getterWatchFunction === "function") {
        this.getterWatchList[attribute] = getterWatchFunction;
    }


    this[attribute] = this.default[attribute]
    for (var i = 0; i < fallback.length; i++) {
        var type = fallback[i];

        if (value && value.length > 0) {
            this['setData' + JssService.toCamelCase(type)](attribute, value); // Call this.addDataAttribute(value) || this.addDataCookie(value) etc...
            this[attribute] = value;
        }
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

    if (typeof this.setterWatchList[attribute] === "function") { // Use the watchlist to add functionality whenever a data attribute is updated
        this.setterWatchList[attribute]();
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