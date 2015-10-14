//----------------------------------------------
//  Module defaults
//----------------------------------------------

var Test = function(element) {
    this.moduleName = "test"; // This is the name which corresponds with the className && JssService.activeModuless
};
Test.prototype = Object.create(Jss.prototype);
JssService.addModule("test");




//------------------------------------------
//  Module customs
//------------------------------------------

Test.prototype.init = function(){

    this.default = {
        isValid: "false"
    };

    this.getData('isValid',{
        fallback: ['ajax','cookie','attribute'],
        getterWatchFunction: function(){console.log("Get this.test");},
        setterWatchFunction: function(){console.log("Set this.test -> Hup Holland Hup");},
        ajax: {
            url: 'http://localhost:3000/api/users/241/oauth/token?access_token=afd69160535d79529885016f0cb143d9ac181b98839a4f549bb3aec96e1f31a5&nocache=1444802312863'
        }
    });
};
