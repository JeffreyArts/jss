'use strict'

var JssService = {};

// Edit this array to enable or disable modules
JssService.activeModules   = [
    "expand",
    "test",
    "truncate",
]

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
    'addTrigger',
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

    var r;

    switch (name) {
        case "addDefaults":
            if (optionList[name] !== false || typeof optionList[name] === "undefined") {
                r = true;
            } else {
                r = false;
            }
        break;
        default:
        r = optionList[name]
    }

    return r;
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