/**
 * -----------------------------------------------------------------------------
 * Get data: Ajax
 * -----------------------------------------------------------------------------
 *
 * 		| Options |
 * 		- url      {string}                                                     The request url
 * 		- jsonKey  {string}                                                     The target key, if nested use a dot notation
 */
Jss.prototype.getDataAjax = function(value, options) {
    var url = JssService.getOption("url", options);

    console.log(url);

    if (typeof url === "string" && url.length >= 0) {
        var ajaxReturn = this.ajaxHelper.xhr('GET', url);

        ajaxReturn.success(function(result){
            if (typeof result === "object") {
                if (result[value]) {
                    return result[value];
                }
            }
        }).error(function(errorObject){
            console.log(errorObject);
        });
    }

    return false;
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