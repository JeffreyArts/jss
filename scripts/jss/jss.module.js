var JssModule = function(){};

JssModule.prototype.type               = "JssModule";
JssModule.prototype.init               = Jss.prototype.init;
JssModule.prototype.setElement         = Jss.prototype.setElement;

// Triggers
JssModule.prototype.findTriggers       = Jss.prototype.findTriggers;
JssModule.prototype.addTrigger         = Jss.prototype.addTrigger;

// Actions
JssModule.prototype.actions            = Object.create(Jss.prototype.actions);
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