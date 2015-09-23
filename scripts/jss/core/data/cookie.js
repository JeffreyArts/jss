Jss.prototype.dataDefaultsCookie = {
    'expireData': undefined
}

/**
 * -----------------------------------------------------------------------------
 * Get cookie value
 * -----------------------------------------------------------------------------
 * Returns cookie value.
 * Original code is from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
 *
 * @param {string} attribute                                                    The NAME of the cookie
 * @return {string}                                                             The VALUE of the given attribute
 */
Jss.prototype.getDataCookie = function(attribute) {

    if (!attribute) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(attribute).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}


/**
 * -----------------------------------------------------------------------------
 * Set data cookie
 * -----------------------------------------------------------------------------
 * Updates the cookie value.
 * Original code is from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
 *
 * @param {string} attribute                                                    The NAME of the cookie
 * @param {string} value                                                        The VALUE of the cookie
 * @return {undefined}
 */

Jss.prototype.setDataCookie = function(attribute, value, options) {
    var endDate, path, domain, secureConnection;

    if (typeof options === "object") {
        endDate = JssService.getOption('endDate', options);
        path   = JssService.getOption('path', options);
        domain = JssService.getOption('domain', options);
        secureConnection = JssService.getOption('secureConnection', options);
    }

    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return false; }
    var sExpires = "";
    if (endDate) {
      switch (endDate.constructor) {
        case Number:
          sExpires = endDate === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + endDate;
          break;
        case String:
          sExpires = "; expires=" + endDate;
          break;
        case Date:
          sExpires = "; expires=" + endDate.toUTCString();
          break;
      }
    }

    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(sValue) + sExpires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secureConnection ? "; secure" : "");
    return true;
}