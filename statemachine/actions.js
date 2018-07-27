/*--- ACTIONS --*/

//this file includes all actions
//actions are functions, which the listeners in listener.js call

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

actionNamespace.showInfoTextStart = function(){
	actionNamespace.showInfoText(infoTextsNamespace.buttonPageDescription.startPage);
};

actionNamespace.showInfoTextMap = function(){
	actionNamespace.showInfoText(infoTextsNamespace.buttonPageDescription.mapInfo);
};

actionNamespace.showInfoTextTimeLine = function(){
	actionNamespace.showInfoText(infoTextsNamespace.buttonPageDescription.lineChartInfo);
};

actionNamespace.showInfoTextCorrelation = function(){
	actionNamespace.showInfoText(infoTextsNamespace.buttonPageDescription.correlationInfo);

};

actionNamespace.showInfoTextUniverse = function(){
	actionNamespace.showInfoText(infoTextsNamespace.buttonPageDescription.universeInfo);
};

actionNamespace.showInfoText = function(text){
	"use strict";
	componentsNamespace.stateMachine.showButtonPageDescription(text);
};

actionNamespace.hideInfoText = function(){
	"use strict";
	componentsNamespace.stateMachine.hideButtonPageDescription();
};

actionNamespace.actionDrawImpressumPage = function(){
	componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.IMPRESSUM);
};

actionNamespace.actionDrawDataPage = function(){
		componentsNamespace.stateMachine.switchState(configNamespace.STATE_MACHINE.DATA_REGULATION);
};

actionNamespace.changeButtonPointerEventOnButtonClick = function (event) {
	let clickedButton= event.target,
		oldButton = componentsNamespace.currentButton;
	actionNamespace.enableButton(oldButton);
	actionNamespace.disableButton(clickedButton);
	componentsNamespace.currentButton = clickedButton;
}

actionNamespace.enableButton = function(button){		
		button.style("pointer-events", "none");
};

actionNamespace.disableButton = function(button){
		button.style("pointer-events", "all");
};
