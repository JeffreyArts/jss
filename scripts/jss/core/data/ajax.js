/**
 * -----------------------------------------------------------------------------
 * Get data: Ajax
 * -----------------------------------------------------------------------------
 *
 * 		| Options |
 * 		- url      {string}                                                     The request url
 * 		- jsonKey  {string}                                                     The target key, if nested use a dot notation. If not set the attribute parameter will be used.
 *
 * @param {string} attribute                                                    The NAME of the inner variable (this.NAME), is also used as the key for the GET Request {NAME: value}
 * @param {object} options                                                      Object with parameters used to make a GET request
 * @return {string}                                                             The value of the given attribute, or false if an erro occured.
 */
Jss.prototype.getDataAjax = function(attribute, options) {
    var url = JssService.getOption("url", options);
    var jsonKey = JssService.getOption("jsonKey", options) || attribute;


    if (typeof url === "string" && url.length >= 0) {
        var ajaxReturn = this.ajaxHelper.xhr('GET', url);

        return ajaxReturn.success(function(result){
            if (typeof result === "object") {
                if (result[jsonKey]) {
                    return result[jsonKey];
                }
            }
        }).error(function(errorObject){
            console.log(errorObject);
        });
    }

    return false;
};

/**
 * -----------------------------------------------------------------------------
 * Set data: Ajax
 * -----------------------------------------------------------------------------
 * Makes a post request to the options.url in a object {attribute: value}
 *
 * 		| Options |
 * 		- url      {string}                                                     The request url
 * 		- jsonKey  {string}                                                     The target key, if nested use a dot notation. If not set the attribute parameter will be used.
 */
Jss.prototype.setDataAjax = function(attribute, value, options) {
    var url = JssService.getOption("url", options);
    var requestObject = {}
        requestObject[attribute] = value;


    if (typeof url === "string" && url.length >= 0) {
        var ajaxReturn = this.ajaxHelper.xhr('POST', url, requestObject);

        return ajaxReturn.success(function(result){
            return true;
        }).error(function(errorObject){
            console.log(errorObject);
            return false;
        });
    }

}


/**
 * -----------------------------------------------------------------------------
 * Ajax (helper function)
 * -----------------------------------------------------------------------------
 * Based on Atom.js by Todd Motto
 * http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
 */
Jss.prototype.ajaxHelper = {
    // Parses json if possible, otherwise just return text
    parse: function(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    },

    xhr: function(type, url, data) {
        var ajaxHelper = this;

        var methods = {
            success: function() {},
            error: function() {}
        };
        var XHR = XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    methods.success.apply(methods, ajaxHelper.parse(request));
                } else {
                    methods.error.apply(methods, ajaxHelper.parse(request));
                }
            }
        };
        request.send(data);
        return {
            success: function(callback) {
                methods.success = callback;
                return methods;
            },
            error: function(callback) {
                methods.error = callback;
                return methods;
            }
        };
    }
};

Jss.prototype.ajax = {
    // Get
    get: function(src) {
        console.log(this);
    },

    // Set
    put: function(url, data) {
        return this.ajaxHelper.xhr('PUT', url, data);
    },

    // Add
    post: function(url, data) {
        return this.ajaxHelper.xhr('POST', url, data);
    }

};