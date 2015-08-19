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
    hover:      ['hover',    'mouseOver',   'onMouseOver'],
    click:      ['click',    'onClick'      ],
    focus:      ['focus',    'onFocus'      ],
    change:     ['change',   'onChange'     ],
    mouseIn:    ['mouseIn',  'onMouseIn'    ],
    mouseOut:   ['mouseOut', 'onMouseOut'   ],
};

JssService.forbiddenProperties = [
    'type',
    'triggers',
    'addTrigger',
    'findTriggers'
];

/**
 * Is Module
 *
 * @return {boolean} true if element is a module, otherwise false
 */
JssService.isModule = function(element, module) {
    var arr = element.className.split(" ");
    var found = false;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(module)        > -1 &&
            arr[i].indexOf(module + "_") == -1 &&
            arr[i].indexOf(module + "-") == -1)
        {
            found = true;
            break;
        }
    }
    return found;
}

/**
 * To CamelCase
 *
 * @return {string} a camelcased string
 */
JssService.toCamelCase = function(string) {
    var arr, res;
    res = "";
    arr = string.split(" ");
    var i = 0;
    for (var i in arr) {
        if (typeof i != "undefined") {
            res += arr[i][0].toUpperCase()+ arr[i].slice(1); // Capitalize first letter
        }
    }
    return res;
}

/**
 * Is Trigger
 *
 * @return {boolean} true if element is a module, otherwise false
 */
JssService.isTrigger = function(element, module) {
    if (element.className.indexOf(module + "--") > -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Get trigger name
 *
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
 * Trigger name is allowed
 *
 * @return {boolean} True if the triggername is allowed, otherwise false.
 */
JssService.triggerNameIsAllowed = function(element, module) {
    if (JssService.forbiddenProperties.indexOf(this.getTriggerName(element, module)) > -1) {
        // This triggerName is a core property, throw error
        console.error('Triggername `' + getTriggerName(element,module) + '` is not allowed. Change the trigger so it does not corresponds any of these: ' + JssService.forbiddenProperties)
        return false;
    }
    return true;
}