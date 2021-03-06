'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Expand = function(element) {
    this.moduleName = "expand"; // This is the name which corresponds with the className && JssService.activeModuless
}
Expand.prototype = Object.create(Jss.prototype);
JssService.addModule("expand");





//------------------------------------------
//  Module customs
//------------------------------------------

Expand.prototype.init = function(){
    var expand = this;
    expand.status = true;

    this.configureTrigger("trigger", function(trigger) {

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
//----------------------------------------------
//  Module defaults
//----------------------------------------------

var FancyShade = function(element) {
    this.moduleName = "fancy-shade"; // This is the name which corresponds with the className && JssService.activeModuless
}
FancyShade.prototype = Object.create(Jss.prototype);
JssService.addModule("fancyShade");




//------------------------------------------
//  Module customs
//------------------------------------------

FancyShade.prototype.init = function(){

    var self = this;

    this.addAction('click',function(){
        if (self.status) {
            self.setState("Closed");
            self.removeState("Open");
            self.status = false;
        } else {
            self.setState("Open");
            self.removeState("Closed");
            self.status = true;
        }
    }, {
        addDefaults:false
    });
}
'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var ProfileImageUpload = function(element) {
    this.moduleName = "profile-image-upload"; // This is the name which corresponds with the className && JssService.activeModuless
}
ProfileImageUpload.prototype = Object.create(Jss.prototype);
JssService.addModule("profile-image-upload");

//------------------------------------------
//  Module customs
//------------------------------------------

ProfileImageUpload.prototype.init = function(){

    var self = this;

    // Configure Fileinput
    self.configureTrigger("fileinput", function(trigger) {
        function readURL(input) {
        //
        //     if (input.files && input.files[0]) {
        //         var reader = new FileReader();
        //
        //         reader.onload = function (e) {
        //             $('#blah').attr('src', e.target.result);
        //         }
        //
        //
        //         reader.readAsDataURL(input.files[0]);
        //     }
        }
        trigger.addAction("change", function(fileinput) {
            var file     = trigger.element.files[0];
            var filename = trigger.element.files[0].name;
            if( self.isImage(filename) ) {
                var imageFile = self.getImageSrc(file);
                self.trigger("image",function(target){
                    console.log(target.element, imageFile);
                    target.element.src = imageFile
                })
            }

        });
    });
}

/**
 * -----------------------------------------------------------------------------
 * Is image
 * -----------------------------------------------------------------------------
 * Checks if the uploaded file is an image.
 *
 * @param {string} value                                                        The value which needs to be checked if it is an image
 * @return {boolean}
 */
ProfileImageUpload.prototype.isImage = function(value){
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(value)
}

ProfileImageUpload.prototype.getImageSrc = function(file){
    return URL.createObjectURL(file);
}

/**
 * -----------------------------------------------------------------------------
 * Parse image file
 * -----------------------------------------------------------------------------
 *
 */
ProfileImageUpload.prototype.parseImageFile = function(){
    var filesObj = trigger.element.files;
}
'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var StickyHeight = function(element) {
    this.moduleName = "sticky-height"; // This is the name which corresponds with the className && JssService.activeModuless
}
StickyHeight.prototype = Object.create(Jss.prototype);
JssService.addModule("stickyHeight");




//------------------------------------------
//  Module customs
//------------------------------------------

StickyHeight.prototype.init = function(){
    this.setHeight(this.getHeight());
}

'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Test = function(element) {
    this.moduleName = "test"; // This is the name which corresponds with the className && JssService.activeModuless
}
Test.prototype = Object.create(Jss.prototype);
JssService.addModule("test");




//------------------------------------------
//  Module customs
//------------------------------------------

Test.prototype.init = function(){
    console.log("test",this);
    this.default = {
        test: "ABC"
    }
    this.addData('test','Hup holland hup',{
        fallback: ['cookie']
    })
}

'use strict'

//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Truncate = function(element) {
    this.moduleName = "truncate"; // This is the name which corresponds with the className && JssService.activeModuless
}
Truncate.prototype = Object.create(Jss.prototype);
JssService.addModule("truncate");

//------------------------------------------
//  Module customs
//------------------------------------------

Truncate.prototype.init = function(){

    var self = this;

    self.default = {
        lines: 1,
        ellepsis: false
    };


    self.ellepsis   = self.getData("ellepsis");                                 // "..." || undefined
    self.lines      = parseInt(self.getData("lines"),10);

    self.lineHeight         = self.setDefaultLineHeight();
    self.originalText       = self.getText();

    if ( isNaN(parseInt(self.lines, 10))) {
        self.setData("lines", self.default.lines);
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