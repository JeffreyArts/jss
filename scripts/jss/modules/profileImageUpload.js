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