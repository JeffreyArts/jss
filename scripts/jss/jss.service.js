'use strict'

/**
 * @module JssService
 */
var JssService = {};

// Edit this array to enable or disable default modules
JssService.activeModules   = []

// Set this to false in a live environment
JssService.dev             = true;

/**************************
*
*   Below are core properties defined, becarefull when you think of changing these...
*
**************************/


JssService.actions = {
    hover:      ['hover',    'mouseover',   'onmouseover'                       ], // Fixed
    click:      ['click',    'onclick'                                          ], // Fixed
    mouseIn:    ['mousein',  'onmousein', 'mouseenter', 'onmouseenter'          ], // Fixed
    mouseOut:   ['mouseout', 'onmouseout', 'mouseleave', 'onmouseleave'         ], // Fixed
    resize:     ['resize',   'onresize'                                         ], // Fixed
    focus:      ['focus',    'onfocus'                                          ],
    keyDown:    ['keydown',  'keypress'                                         ],
    keyUp:      ['keyup',    'keyrelease'                                       ],
    change:     ['change',   'onchange'                                         ],
};

JssService.enterDelay = 1000;                                                   // Amount of miliseconds which is used to remove the entered state. (see core.actions) JssService.enterDelay setTimeout

JssService.forbiddenProperties = [
    'type',
    'triggers',
    'configureTrigger',
    'findTriggers'
];

/**
 * -----------------------------------------------------------------------------
 * Is Module
 * -----------------------------------------------------------------------------
 *
 * @param  {object} element                                                     domElement
 * @param  {string} moduleName                                                  Name of the module
 * @return {boolean} true if element is a module, otherwise false
 */
JssService.isModule = function(element, moduleName) {
    var arr = element.className.split(" ");
    var found = false;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(moduleName)        > -1 &&
            arr[i].indexOf(moduleName + "_") == -1 &&
            arr[i].indexOf(moduleName + "-") == -1)
        {
            found = true;
            break;
        }
    }
    return found;
}


/**
 * -----------------------------------------------------------------------------
 * Add Module
 * -----------------------------------------------------------------------------
 *
 * @param  {object} element                                                     domElement
 * @param  {string} moduleName                                                  Name of the module
 * @return {boolean} true if element is a module, otherwise false
 */
JssService.addModule = function(moduleName) {
    this.activeModules.push(this.toKebabCase(moduleName))
}

/**
 * -----------------------------------------------------------------------------
 * To CamelCase
 * -----------------------------------------------------------------------------
 *
 * @param  {string} input                                                       String or array which needs to be camelcased
 * @return {string} a camelcased string
 */
JssService.toCamelCase = function(input) {
    var arr, res;
    res = "";
    if (typeof input === "string") {
        input = input.replace(/\-/g," ");                                       // Replace all dashes with spaces
        arr = input.split(" ");
    } else {
        arr = input;                                                            // Assume it is an array
    }



    var i = 0;
    for (var i in arr) {
        if (typeof i != "undefined") {
            res += arr[i][0].toUpperCase()+ arr[i].slice(1); // Capitalize first letter
        }
    }
    return res;
}

/**
 * -----------------------------------------------------------------------------
 * To kebab-case
 * -----------------------------------------------------------------------------
 *
 * @param  {string} input                                                       String or array which needs to be camelcased
 * @return {string} a camelcased string
 */
JssService.toKebabCase = function(input) {
    var res, str;
    res = "";

    if (typeof input === "string") {
        str = input;
    } else {                                                                    // Assume it is an array
        str = input.join(" ");
    }

    // First change it to camelcase
    str = this.toCamelCase(str);

    var max = str.length;
    for (var i=0; i < max; i++) {
        // Check if character is uppercase
        if (str[i] != str[i].toLowerCase()) {
            if (i!==0) {
                str = str.substr(0, i) + "-" + str.substr(i);
                i++;
            }
        }
    }

    return res = str.toLowerCase();
}



/**
 * -----------------------------------------------------------------------------
 * Get option
 * -----------------------------------------------------------------------------
 * @param  {string} name                                                        Keyname in optionList
 * @param  {array} optionList                                                   Array with all possible options
 * @return {}                                                                   Copy of the value (optionsList[name])
 */
JssService.getOption = function(name, optionList) {
    if (typeof optionList !== "object") {
        return false;
    }

    var res;

    switch (name) {
        case "addDefaults":
            if (optionList[name] !== false || typeof optionList[name] === "undefined") {
                res = true;
            } else {
                res = false;
            }
        break;
        case "fallback":
            if (Array.isArray(optionList[name])) {
                res = optionList[name];
            } else if (typeof optionList[name] === "string"){
                res = [optionList[name]];
            }
        break;
        default:
        res = optionList[name]
    }

    return res;
}

/**
 * -----------------------------------------------------------------------------
 * Is Trigger
 * -----------------------------------------------------------------------------
 *
 * @param  {object} element                                                     domElement
 * @param  {string} moduleName                                                  Name of the module
 * @return {boolean} true if element is a module, otherwise false
 */
JssService.isTrigger = function(element, moduleName) {
    if (element.className.indexOf(moduleName + "--") > -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Get trigger name
 * -----------------------------------------------------------------------------
 *
 * @param  {object} element                                                     domElement
 * @param  {string} moduleName                                                  Name of the module
 * @return {string} Name of the trigger.
 */
JssService.getTriggerName = function(element, moduleName) {
    if (typeof element != "object") {
        console.error('Required first argument `element` needs to be a domElement.');
        return false;
    }
    if (typeof moduleName != "string") {
        console.error('Required second argument `moduleName` needs to be a string.');
        return false;
    }

    // As an example we assume that the value of element.className equals 'b module--triggerName'
    var startPos = element.className.indexOf(moduleName + "--");                    // 2
    var sliced = element.className.slice(startPos, element.className.length )       // 'module--triggerName'
    var endPos = sliced.indexOf(" ");                                               // -1       // not found
    if (endPos != -1) {                                                             // 19
        sliced = sliced.slice(0,endPos);                                            // if there is more after the string, this will remove it
    }
    return sliced.replace(moduleName + "--","")
}

/**
 * -----------------------------------------------------------------------------
 * Trigger name is allowed
 * -----------------------------------------------------------------------------
 *
 * @param  {object} element                                                     domElement
 * @param  {string} moduleName                                                  Name of the module
 * @return {boolean} True if the triggername is allowed, otherwise false.
 */
JssService.triggerNameIsAllowed = function(element, moduleName) {
    if (JssService.forbiddenProperties.indexOf(this.getTriggerName(element, moduleName)) > -1) {      // This triggerName is a core property, throw error
        console.error('Triggername `' + getTriggerName(element,moduleName) + '` is not allowed. Change the trigger so it does not corresponds any of these: ' + JssService.forbiddenProperties)
        return false;
    }
    return true;
}