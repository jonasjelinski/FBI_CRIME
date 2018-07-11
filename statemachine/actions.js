//this file includes all actions, which the listeners in listener.js call

var actionNamespace = actionNamespace || {};

actionNamespace.actionDrawStartPage = function(){
	"use strict";
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.START);	
};

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
	actionNamespace.showInfoText(infoTextsNamespace.shortPageDescription.mapInfo);
};

actionNamespace.showInfoTextTimeLine = function(){
	actionNamespace.showInfoText(infoTextsNamespace.shortPageDescription.lineChartInfo);
};

actionNamespace.showInfoTextCorrelation = function(){
	actionNamespace.showInfoText(infoTextsNamespace.shortPageDescription.correlationInfo);

};

actionNamespace.showInfoTextUniverse = function(){
	actionNamespace.showInfoText(infoTextsNamespace.shortPageDescription.universeInfo);
};

actionNamespace.showInfoText = function(text){
	"use strict";
	componentsNamespace.shortInfoText.setInfoText(text);	
	componentsNamespace.shortInfoText.updatesHimself();
	componentsNamespace.shortInfoText.showInfoText();
};

actionNamespace.hideInfoText = function(){
	componentsNamespace.shortInfoText.hideInfoText();
};
