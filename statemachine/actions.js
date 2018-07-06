//this file includes all actions, which the listeners in listener.js call

var actionNamespace = actionNamespace || {};

actionNamespace.actionDrawUniversePage = function(){
	"use strict";
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.UNIVERSE);
};

actionNamespace.actionDrawLineChartPage = function(){
	"use strict";
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.LINE_CHART);
};

actionNamespace.actionDrawMapPage = function(){
	"use strict";
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.MAP);
};

actionNamespace.actionDrawCrimeCorrelationPage = function(){
	"use strict";
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.CRIME_CORRELATION);
};

actionNamespace.actionDrawInfoPage = function(){
	"use strict";
	componentsNamespace.stateMachine.drawInfoPage();
};

actionNamespace.showInfoTextMap = function(){
	actionNamespace.showInfoText("das ist eine map");
};

actionNamespace.showInfoTextTimeLine = function(){
	actionNamespace.showInfoText("das ist ein line LINE_CHART");
};

actionNamespace.showInfoTextCorrelation = function(){
	actionNamespace.showInfoText("das ist eine korrelation");

};

actionNamespace.showInfoTextUniverse = function(){
	actionNamespace.showInfoText("das sind planeten");
};

actionNamespace.showInfoText = function(text){
	"use strict";
	componentsNamespace.shortInfoText.setInfoText(text);
	
	componentsNamespace.shortInfoText.updatesHimself();
	componentsNamespace.shortInfoText.switchVisibility();
};

actionNamespace.hideInfoText = function(){
	componentsNamespace.shortInfoText.switchVisibility();
};
