/*******************************************************************************

    Styles

    - setHeight(value)                                                          {string || number}
    - getHeight()                                                               {string, function, boolean}
    - setWidth(value)                                                           {string, function, boolean}
    - getWidth()

*******************************************************************************/

Jss.prototype.setHeight = function(height) {
    if (typeof height === "number") {
        height += "px";
    }

    if (typeof height !== "string") {
        throw("parameter height needs to be a string or integer");
    }

    this.element.style.height = height;
}

Jss.prototype.getHeight = function() {
    return this.element.offsetHeight;
}

Jss.prototype.setWidth = function(width) {
    if (typeof width == "number") {
        width += "px";
    }

    if (typeof width !== "string") {
        throw("parameter width needs to be a string or integer");
    }
his.element.style.width = width;
}

Jss.prototype.getWidth = function() {
    return this.element.offsetWidth;
}