/*eslint-env browser*/

/*This js file connects all listners of the html page which listen to the button-clicks
and call the actions of the action folder*/

var listenerNamespace = listenerNamespace || {};

//this is the document of the html page
listenerNamespace.doc = document;

//this function creates new listeners
listenerNamespace.createListener = function (id, type, action) {
	"use strict";
	let listener=listenerNamespace.doc.getElementById(id);
	listener.addEventListener(type, () => { action();});
	return listener;
};

//this listeners starts the action drawing
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("planetButton", "click", actionNamespace.actionDrawUniversePage);
listenerNamespace.drawLineChartListener = listenerNamespace.createListener("timeButton", "click", actionNamespace.actionDrawLineChartPage);
listenerNamespace.drawForceListener = listenerNamespace.createListener("forceButton", "click", actionNamespace.actionDrawCrimeCorrelationPage);
listenerNamespace.drawMapListener = listenerNamespace.createListener("mapButton", "click", actionNamespace.actionDrawMapPage);
listenerNamespace.drawInfoButtonListener = listenerNamespace.createListener("infoButton", "click", actionNamespace.actionDrawInfoPage);
listenerNamespace.drawInfoButtonListener = listenerNamespace.createListener("startButton", "click", actionNamespace.actionDrawStartPage);

listenerNamespace.drawStartPage = listenerNamespace.createListener("impressum", "click",  actionNamespace.actionDrawImpressumPage);
listenerNamespace.drawStartPage = listenerNamespace.createListener("dataregulation", "click", actionNamespace.actionDrawDataPage);
listenerNamespace.drawStartPage = listenerNamespace.createListener("FBIlogo", "click", actionNamespace.actionDrawStartPage);

//this listeners show or hide the infoTexts on hover
//this listeners starts the action drawing

//shows
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("planetButton", "mouseover", actionNamespace.showInfoTextUniverse);
listenerNamespace.drawLineChartListener = listenerNamespace.createListener("timeButton", "mouseover", actionNamespace.showInfoTextTimeLine);
listenerNamespace.drawForceListener = listenerNamespace.createListener("forceButton", "mouseover", actionNamespace.showInfoTextCorrelation);
listenerNamespace.drawMapListener = listenerNamespace.createListener("mapButton", "mouseover", actionNamespace.showInfoTextMap);

//hides
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("planetButton", "mouseout", actionNamespace.hideInfoText);
listenerNamespace.drawLineChartListener = listenerNamespace.createListener("timeButton", "mouseout", actionNamespace.hideInfoText);
listenerNamespace.drawForceListener = listenerNamespace.createListener("forceButton", "mouseout", actionNamespace.hideInfoText);
listenerNamespace.drawMapListener = listenerNamespace.createListener("mapButton", "mouseout", actionNamespace.hideInfoText);
