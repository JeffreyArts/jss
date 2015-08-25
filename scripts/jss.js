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
    hover:      ['hover',    'mouseover',   'onmouseover'                       ],
    click:      ['click',    'onclick'                                          ],
    focus:      ['focus',    'onfocus'                                          ],
    resize:     ['resize',   'onresize'                                         ],
    keyDown:    ['keydown',  'keypress'                                         ],
    keyUp:      ['keyup',    'keyrelease'                                       ],
    change:     ['change',   'onChange'                                         ],
    mouseIn:    ['mousein',  'onmousein', 'mouseEnter', 'onmouseEnter'          ],
    mouseOut:   ['mouseOut', 'onmouseOut'                                       ],
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
'use strict'


var Jss = function(){};

Jss.prototype.type      = "Jss"
Jss.prototype.triggers  = {};
Jss.prototype.element   = undefined;                                              // {obj} domElement
Jss.prototype.state     = undefined;                                              // {str} State of module, is reflected by the css class __isState

Jss.prototype.findTriggers = function(element) {
    var self = this;
    self.triggers = [];                                                         // If this is not set, all modules will have the same reference point to self.triggers.
    if (typeof element == "undefined") {
        element = this.element;
    }

    // Module is created, now look for any module triggers
    if ( element.hasChildNodes() ) {
        for (var i=0; i < element.childNodes.length; i++) {

            var childElement = element.childNodes[i];                           // Improve readability

            if (childElement.nodeType == 1) {                                   // NodeType 1 == domElement

                if (JssService.isTrigger(childElement, this.moduleName)) {

                    // Add a child element
                    if (JssService.triggerNameIsAllowed(childElement, this.moduleName)) {
                        var triggerName = JssService.getTriggerName(childElement, this.moduleName)

                        if (typeof self.triggers[triggerName] !== "object") {
                            self.triggers[triggerName] = [];
                        }

                        var tmp = new JssTrigger(childElement, {
                            module: self,
                            moduleName: this.moduleName,
                            triggerName: triggerName,
                        });

                        self.triggers[triggerName].push(tmp);
                    }
                }
            }
        }
    }
}

/**
 * -----------------------------------------------------------------------------
 * Add Trigger
 * -----------------------------------------------------------------------------
 *
 * @return {undefined}
 */
Jss.prototype.addTrigger = function(trigger, fn) {
    if ( typeof this.triggers[trigger] == "object") {

        for (var i = 0; i < this.triggers[trigger].length; i++) {
            //self.triggers[trigger][i]
            fn(this.triggers[trigger][i]);
        }

    } else if (JssService.dev) {
        console.error("You are trying to add a trigger which has no attached domElement")
    }
}


/**
 * -----------------------------------------------------------------------------
 *   Init
 * -----------------------------------------------------------------------------
 * Notice the user that a init function needs to be added for controlling the triggers
 *
 * @return {undefined}
 */
Jss.prototype.init = function(func) {
    if (JssService.dev) {
        console.info(this.moduleName + ": Add a prototype.init function to add triggers and stuff")
    }
}

/**
 * -----------------------------------------------------------------------------
 * Set element
 * -----------------------------------------------------------------------------
 * Add a domElement to `this`
 *
 * @return {undefined}
 */
Jss.prototype.setElement = function(element) {
    if (typeof element == "undefined") {
        if (JssService.dev) {
            return console.error("First parameter of setElement needs to be a domElement");
        }
    }
    this.element = element;
}
/*******************************************************************************

    Actions

    - validateAction(request)                                                   {string}
    - addAction(request, fn, addDefaults)                                       {string, function, boolean}

*******************************************************************************/

/**
 * -----------------------------------------------------------------------------
 *   Validate action
 * -----------------------------------------------------------------------------
 * Checks if parameter is a valid action, and logs an error when not.
 *
 * @param {string}                                                              The name of the request
 * @return {boolean} true if a action is valid, otherwise false.
 */
Jss.prototype.validateAction = function(request) {
    var result;
    request = this.getActionElement(request).request
    for (var action in JssService.actions) {
        if (JssService.actions[action].indexOf(request.toLowerCase()) > -1) {
            result = action;
            break;
        }
    }
    if (result) {
        return result;
    } else {
        console.error("validateAction: unknown request", request);
        return false;
    }
}

/**
 * -----------------------------------------------------------------------------
 * 	 Add Action
 * -----------------------------------------------------------------------------
 * Adds an action to the object, list of possible requests can be found in Jss.actions
 *
 * | Options
 * 		- addDefaults {boolean}                                                 True: add default classes, false: don't
 *
 * @param {string}                                                              The name of the request
 * @param {function}                                                            The function which should be triggered
 * @param {object}                                                              Options
 * @return {boolean} true if a action is succesfully added, otherwise false.
 */
Jss.prototype.addAction = function(request, fn, options) {

    var self        = this;
    var action      = self.validateAction(request)
    var actions     = [];
    var t = self.getActionElement(request);
    var element     = t.element;
    var request     = t.request;
    t = undefined;

    // Options
    var addDefaults = JssService.getOption("addDefaults", options);



    switch (action) {

        case "resize":

            actions.push(element.addEventListener("resize", fn));

        break;

            case "click":
                actions.push(element.addEventListener("click", fn));
                if (addDefaults) {                                                  // Add defaults
                    actions.push(element.addEventListener("click", function(){
                        self.setState("Clicked")
                    }));
                    actions.push(window.addEventListener( "click", function(event) {
                        if (event.target != self.element && self.hasState("Clicked")) {
                            self.removeState("Clicked")
                        }
                    }));
                } // End addDefaults
            break;

        case "hover":
            actions.push(element.addEventListener("mouseover", fn , false));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("mouseover", function(){
                    self.setState("Hover")
                }));
                actions.push(element.addEventListener("mouseout",  function(){
                    self.removeState("Hover")
                }));
            }
        break;

        case "mouseIn":

            actions.push(element.addEventListener("mouseenter", fn , false));
            if (addDefaults) {                                                  // Add defaults
                actions.push(element.addEventListener("mouseenter", function(){
                    self.setState("MouseIn")
                    setTimeout(function(){self.removeState("MouseIn")}, JssService.enterDelay)

                } , false));
            }
        break;
    }

    this.actions

    if (actions.length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Get action element
 * -----------------------------------------------------------------------------
 * @param  {string}                                                             The request
 * @return {object}                                                             An object with 2 properties: request && element
 */
Jss.prototype.getActionElement = function(request) {
    var self = this;
    var prefix = false;
    var newRequest  = request;
    var element = self.element;
    // Set prefix if it exists
    if (request.indexOf(".") > 0) {
        var t       = request.split("."),
        newRequest  = t[1];
        prefix      = t[0];
        t = undefined;
    }

    // Update element according the prefix (or skip it, if not set)
    if (prefix !== false) {
        switch (prefix) {
            case "screen":
            case "window":
                element = window;
            break;
        }
    }

    // Return object
    return {
        request: newRequest,
        element: element
    }
}
/**
 * -----------------------------------------------------------------------------
 * Class name prefix
 * -----------------------------------------------------------------------------
 * The prefix equals the modulename, or - when it's a trigger object - modulename--triggername
 *
 * @param  {string}  [description]
 * @return {string}      [description]
 */
Jss.prototype.classNamePrefix = function(data) {
    if (this.type == "JssTrigger") {
        return this.moduleName + "--" + this.triggerName;
    } else {
        return this.moduleName;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Remove class name
 * -----------------------------------------------------------------------------
 * Removes the `this.element` classname
 * 	- "all" || undefined        > Removes ALL classnames
 *  - "allStates" || "states"   > Remove all STATES
 *  - all other strings remove that specific string from the className
 *
 * @param {string}
 * @return {undefined}
 */
Jss.prototype.removeClassName = function(input) {

    var classList  = [];

    if (input == "all" || typeof input == "undefined") {

        this.element.className = "";

    } else if (input == "states" || input == "allStates") {

        classList = this.element.className.split(" ");
        for (var i in classList) {
            className = classList[i];
            if (className.indexOf("__is") > -1) {
                delete classList[i];
            }
        }
        this.element.className = classList.join(" ");

    } else if(typeof input == "string") {
        this.element.className = this.element.className.replace(input,"");
    } else {
        console.error("removeClassName: parameter should be a string");
    }
}

/**
 * -----------------------------------------------------------------------------
 * Add class name
 * -----------------------------------------------------------------------------
 * Adds a class name by string or array.
 * Does NOT check for duplicates
 *
 * @param  {string}
 * @return {undefined}
 */
Jss.prototype.addClassName = function(data) {
    this.element.className += " ";
    if (typeof data == "string") {
        this.element.className += data;
    } else {
        this.element.className += data.join(" ")
    }
}

/**
 * -----------------------------------------------------------------------------
 * Get data
 * -----------------------------------------------------------------------------
 * Returns the value of the requested attribute. Search first for a data-[ATTRIBUTE] value
 * If not found, it checks for the attribute in the default object. When that is not being
 * found neither, the normal this[attribute] value is being returned.
 *
 * @param {string}                                                              The NAME of the data attribute (data-NAME)
 * @return {string}                                                             The value of the given attribute
 */
Jss.prototype.loadData = function(attribute){

    var result = false;

    if (typeof this.element.dataset[attribute] !== "undefined") {
        result = this.element.dataset[attribute];
    } else if (typeof this[attribute] === "undefined" && typeof this.default === "object") {
        result = this.updateData(attribute, this.default[attribute]);
    } else {
        result = this[attribute];
        console.error("getData: The requested attribute `" + attribute + "` is not defined. Return undefined instead");
    }

    return this[attribute] = result;
}

/**
 * -----------------------------------------------------------------------------
 * Update data
 * -----------------------------------------------------------------------------
 * Set the value to the given attribute. And updates the data-[ATTRIBUTE] value
 *
 * @param {string}                                                              The NAME of the data attribute (data-NAME="value")
 * @param {string}                                                              The VALUE of the data attribute (data-name="VALUE")
 * @param {function}                                                            The function which should be executed when updating this data attribute
 * @return {undefined} -
 */

Jss.prototype.updateData = function(attribute, value, fn){
    this[attribute] = value;
    if (typeof value !== "undefined") {
        this.element.dataset[attribute] = this[attribute];

        if (typeof fn === "function") {                                         // Use this third parameter to add functionality whenever a data attribute is updated
            fn();
        }
    } else {
        delete this.element.dataset[attribute];
    }
}

/**
 * -----------------------------------------------------------------------------
 * Set State
 * -----------------------------------------------------------------------------
 * This updates the state of the object. States are being added to the class name prefix with a double underscore.
 * If you would have the module `envelope` and give it the state `open`. The class name `envelope__open` will be added.
 * Whenever you remove the state `open`, the according class name will be removed as well.
 *
 * @param  {string}
 * @return {boolean}                                                            True on success, otherwise false (might already have the state)
 */
Jss.prototype.setState = function(string) {
    var element, verifiedState, state, className;

    element         = this.element;
    state           = JssService.toCamelCase(string);
    className       = this.classNamePrefix() + "__is" + state;
    // Check if this.state is an array, and make it one if not.
    if (Array.isArray(this.state) == false ) {
        this.state = [];
    }
    // This if statement prevents that the same state is being set multiple times
    if ( !this.hasState(string) ) {
        this.addClassName(className)
        this.state.push(state);
        console.log(this.state);
        return true;
    } else {
        return false;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Has state
 * -----------------------------------------------------------------------------
 * Checks if the parameter is already a state and returns true if so. Otherwise false.
 *
 * @param  {string}
 * @return {boolean}                                                            True if it has the given state, otherwise false
 */
Jss.prototype.hasState = function(string) {
    if (typeof this.state == "object" && this.state.indexOf(string) >= 0) {
        return true;
    } else {
        return false;
    }
}


/**
 * -----------------------------------------------------------------------------
 * Remove state
 * -----------------------------------------------------------------------------
 * Removes the state from the states array, and from the element.className
 *
 * @param  {string}                                                             The name of the state which should be removed
 * @return {undefined}
 */
Jss.prototype.removeState = function(str) {

    var state      = JssService.toCamelCase(str);
    var stateIndex = this.state.indexOf(state);

    if (str == "all" || typeof str == "undefined") {
        this.removeClassName("states");
    } else {
        this.state.splice(stateIndex, 1);
        if (typeof this.moduleAction != "undefined" && this.moduleAction.length > -1) {
            this.removeClassName(this.classNamePrefix() + "" + this.moduleAction + "__is" + state);
        } else {
            this.removeClassName(this.classNamePrefix() + "__is" + state);
        }
    }
}

var JssModule = function(){};

JssModule.prototype.type               = "JssModule";
JssModule.prototype.init               = Jss.prototype.init;
JssModule.prototype.setElement         = Jss.prototype.setElement;

// Triggers
JssModule.prototype.findTriggers       = Jss.prototype.findTriggers;
JssModule.prototype.addTrigger         = Jss.prototype.addTrigger;

// Actions
//JssModule.prototype.actions            = Object.create(Jss.prototype.actions);
JssModule.prototype.validateAction     = Jss.prototype.validateAction;
JssModule.prototype.addAction          = Jss.prototype.addAction;

// Class names
JssModule.prototype.removeClassName    = Jss.prototype.removeClassName;
JssModule.prototype.addClassName       = Jss.prototype.addClassName;

// States
JssModule.prototype.setState           = Jss.prototype.setState;
JssModule.prototype.hasState           = Jss.prototype.hasState;
JssModule.prototype.removeState        = Jss.prototype.removeState;

// Data attributes
JssModule.prototype.loadData           = Jss.prototype.loadData;
JssModule.prototype.updateData         = Jss.prototype.updateData;
'use strict'

var JssTrigger = function(element, options) {
    this.setElement(element);

    if (typeof options === "object") {
        if (typeof options.module === "object") {
            this.module = options.module;
        }
        if (typeof options.moduleName === "string") {
            this.moduleName = options.moduleName;
        }
        if (typeof options.triggerName === "string") {
            this.triggerName = options.triggerName;
        }
    }
}


JssTrigger.prototype                    = Object.create(Jss.prototype);
JssTrigger.prototype.type               = "JssTrigger";
JssTrigger.prototype.setElement         = Jss.prototype.setElement;

// Actions
//JssTrigger.prototype.actions            = Object.create(Jss.prototype.actions);
JssTrigger.prototype.validateAction     = Jss.prototype.validateAction;
JssTrigger.prototype.addAction          = Jss.prototype.addAction;

// Class names
JssTrigger.prototype.removeClassName    = Jss.prototype.removeClassName;
JssTrigger.prototype.addClassName       = Jss.prototype.addClassName;

// States
JssTrigger.prototype.setState           = Jss.prototype.setState;
JssTrigger.prototype.hasState           = Jss.prototype.hasState;
JssTrigger.prototype.removeState        = Jss.prototype.removeState;



var Test = function(element) {

    //----------------------------------------------
    //  Module defaults
    //----------------------------------------------

    var self = this;
    self.moduleName = "test";
    self.setElement(element);

    //----------------------------------------------
    //  Module customs
    //----------------------------------------------

    self.lightSwitch = false;

    self.addAction('mouseIn',function(){

        if (self.lightSwitch) {
            self.setState("Closed");
            self.removeState("Open");
            self.lightSwitch = false;
        } else {
            self.setState("Open");
            self.removeState("Closed");
            self.lightSwitch = true;
        }
    }, {
        addDefaults: true
    });
    self.addAction('hover',function(){

    }, {
        addDefaults: true
    });
}



Test.prototype = Object.create(Jss.prototype);
'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Expand = function(element) {
    this.moduleName = "expand"; // This is the name which corresponds with the className && JssService.activeModuless
}
Expand.prototype = Object.create(Jss.prototype);





//------------------------------------------
//  Module customs
//------------------------------------------

Expand.prototype.init = function(){
    var expand = this;
    expand.status = true;

    this.addTrigger("trigger", function(trigger) {
        trigger.addAction('hover',function(){

        });
        trigger.addAction('click',function(){
            if (expand.status) {
                expand.setState("Closed");
                expand.removeState("Open");
                expand.status = false;
            } else {
                expand.setState("Open");
                expand.removeState("Closed");
                expand.status = true;
            }
        }, {
            addDefaults:false
        })

    });
}
'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Truncate = function(element) {
    this.moduleName = "truncate"; // This is the name which corresponds with the className && JssService.activeModuless
}
Truncate.prototype = Object.create(Jss.prototype);

//------------------------------------------
//  Module customs
//------------------------------------------

Truncate.prototype.init = function(){

    var self = this;

    self.default = {
        lines: 1,
        ellepsis: false
    };


    self.ellepsis   = self.loadData("ellepsis");                                 // "..." || undefined
    self.lines      = parseInt(self.loadData("lines"),10);

    self.lineHeight         = self.setDefaultLineHeight();
    self.originalText       = self.getText();

    if ( isNaN(parseInt(self.lines, 10))) {
        self.updateData("lines", self.default.lines);
    }

    self.updateText();

    self.addAction("screen.resize", function(trigger) {
        if (self.lines <= self.calculateNumberOfLines()) {
            self.updateText();
        }
    });
}


/**
 * -----------------------------------------------------------------------------
 * Update text
 * -----------------------------------------------------------------------------
 *
 * Update textContent word by word, and when more lines are added then required,
 * remove the last word.
 *
 * 		! UPDATES
 * 		  - this.element.textContent
 *
 * @return {string}
 */
Truncate.prototype.updateText = function(){
    var text = this.originalText;
    if (this.ellepsis.length > 0) {
        text += this.ellepsis
    }
    var splittedText = text.split(" ");

    text = this.addWord(splittedText);
    if (text.length > this.originalText.length) {
        text= this.originalText;
    } else {
        text = text.substring(0, text.lastIndexOf(" "));
        if (this.ellepsis.length > 0) {
            text += this.ellepsis
        }
    }

    return this.element.textContent = text;
}


Truncate.prototype.addWord = function(array, string, index){
    var newString = "";
    if (typeof index === "undefined") {
        index = 0;
    }
    if (typeof string === "undefined") {
        string = "";
    }
    newString = string + " " + array[index];

    this.element.textContent = newString;
    if (this.ellepsis.length > 0) {
        this.element.textContent += this.ellepsis;
    }

    //console.log(this.lines +" >= " + this.calculateNumberOfLines() +" && " + array.length + " > " + index, newString)
    if (this.lines >= this.calculateNumberOfLines() && array.length-1 > index) {
        return this.addWord(array, newString, index+1);
    } else {
        return newString;
    }
}

/**
 * -----------------------------------------------------------------------------
 * Set DEFAULT line-height
 * -----------------------------------------------------------------------------
 * @return {number} on succes, otherwise false
 */
Truncate.prototype.setDefaultLineHeight = function(){
    var lineHeight = this.element.style["line-height"]
    if (lineHeight == 'normal' || lineHeight.length >= 0) {
        lineHeight = 1.4;
    }
    //if (JssService.dev) { console.info("Default line-height: ", lineHeight);}    // Only log this value in dev mode

    return this.setLineHeight(lineHeight);
}

/**
 * -----------------------------------------------------------------------------
 * Set line-height
 * -----------------------------------------------------------------------------
 * @return {number} on succes, otherwise false
 */
Truncate.prototype.setLineHeight = function(int){
    if (typeof int !== "number") {
        return false;
    }
    return this.element.style["line-height"] = int;
}

/**
 * -----------------------------------------------------------------------------
 * Get number of lines
 * -----------------------------------------------------------------------------
 * @return {number}
 */
    Truncate.prototype.calculateNumberOfLines = function(){
    var self = this;
    var containerHeight = parseInt(self.element.clientHeight                                        , 10);
    var fontSize        = parseInt(getComputedStyle(self.element).getPropertyValue('font-size')     , 10);
    var numberOfLines   = Math.round(containerHeight / (self.lineHeight*fontSize));
    //if (JssService.dev) { console.log("calculateNumberOfLines: ", numberOfLines);}    // Only log this value in dev mode

    return numberOfLines;
}

/**
 * -----------------------------------------------------------------------------
 * Get text
 * -----------------------------------------------------------------------------
 * @return {string}
 */
Truncate.prototype.getText = function(){
    return this.element.textContent;
}

var  JssController = {};
JssController.modules 		= []; // Result array with objects of all the found modules
JssController.activeModules 	= JssService.activeModules;

JssController.findModules = function() {
    var allElements = document.getElementsByTagName("*");                       // Array with all domElements
    var test = [];
    var self = this;
    for (var i=0; i < allElements.length; i++) {

        // Set default vars //
        var element = allElements[i];                                           // Specific domElement
        var tmp = false;

        // Loop through the (active) modules array and add/instantiate them
        self.activeModules.forEach(function(module){
            if (JssService.isModule(element, module)) {
                tmp = eval("new " + JssService.toCamelCase(module) + "(element)"); // Dynamicly load modules

                tmp.setElement(element);                                        // Add the domElement to the module
                tmp.findTriggers();			                                    // Search for module triggers

                tmp.init();					                                    // Executes everything within the init function
                self.modules.push(tmp);

            }
        }); // End forEach
    }
}

    JssController.findModules();
    console.log(JssController);