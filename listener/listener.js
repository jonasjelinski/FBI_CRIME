/*eslint-env browser*/

/*This js file connects all Listners of the html page with the actions of the action folder*/

//this is the namespace of the listener.js

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
//and should draw a nice circle
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("planetButton", "click", actionNamespace.actionDrawUniversePage);
listenerNamespace.drawLineChartListener = listenerNamespace.createListener("timeButton", "click", actionNamespace.actionDrawLineChartPage);
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("forceButton", "click", actionNamespace.actionDrawCrimeCorrelationPage);
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("mapButton", "click", actionNamespace.actionDrawMapPage);
listenerNamespace.drawUniverseListener = listenerNamespace.createListener("infoButton", "click", actionNamespace.actionDrawInfoPage);
