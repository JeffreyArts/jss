'use strict'

var JssService = {};

// Edit this array to enable or disable modules
JssService.activeModules   = [
    "expand",
    "test",
]
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
    'findTriggers',
    'toCamelCase'
];

/**
 * Is Module
 * 
 * @return {Boolean} true if element is a module, otherwise false
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
 * Is Trigger
 * 
 * @return {Boolean} true if element is a module, otherwise false
 */
JssService.isTrigger = function(element, module) {
    if (element.className.indexOf(module + "--") > -1) { 
        return true;
    } else {
        return false;
    }
}

JssService.getTriggerName = function(element, module) {
    // As an example we assume that the value of element.className == 'a module--triggerName'

    var startPos = element.className.indexOf(module + "--");                        // 2       
    var sliced = element.className.slice(startPos, element.className.length )       // 'module--triggerName'
    var endPos = sliced.indexOf(" ");                                               // -1       // not found
    if (endPos != -1) {                                                             // 19
        sliced = sliced.slice(0,endPos);                                            // if there is more after the string, this will remove it
    }
    return sliced.replace(module + "--","")
}

/**
 * Trigger name is allowed 
 *
 * Checks if the triggername is allowed, returns a boolean and throws error if it is not allowed 
 */
JssService.triggerNameIsAllowed = function(element, module) {
    if (JssService.forbiddenProperties.indexOf(this.getTriggerName(element, module)) > -1) {
        // This triggerName is a core property, throw error
        console.error('Triggername `' + getTriggerName(element,module) + '` is not allowed. Change the trigger so it does not corresponds any of these: ' + JssService.forbiddenProperties) 
        return false;
    } 
    return true;
}