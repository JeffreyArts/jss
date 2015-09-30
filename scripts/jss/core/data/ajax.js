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
    var url = "http://localhost:3000";
console.log(this.ajax);
    return this.ajax.get(url);

}


/**
 * -----------------------------------------------------------------------------
 * Ajax (helper function)
 * -----------------------------------------------------------------------------
 * Based on Atom.js by Todd Motto
 * http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
 */
Jss.prototype.ajax = function() {
    // Parses json if possible, otherwise just return text
    var parse = function(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function(type, url, data) {
        var methods = {
            success: function() {},
            error: function() {}
        };
        var XHR = root.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    methods.success.apply(methods, parse(request));
                } else {
                    methods.error.apply(methods, parse(request));
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
    };
    return {
        // Get
        get: function(src) {
            return xhr('GET', src);
        },

        // Set
        put: function(url, data) {
            return xhr('PUT', url, data);
        },

        // Add
        post: function(url, data) {
            return xhr('POST', url, data);
        }
    }
};