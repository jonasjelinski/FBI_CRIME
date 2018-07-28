/*--- COMPONENTS --*/

//implements the statemachine
//the stateMachine controlls the logic of all pages
//each state shows a different page

var componentsNamespace = componentsNamespace || {};

componentsNamespace.startButton = d3.select("#startButton");
componentsNamespace.mapButton = d3.select("#mapButton");
componentsNamespace.timeButton = d3.select("#timeButton");
componentsNamespace.forceButton = d3.select("#forceButton");
componentsNamespace.planetButton = d3.select("#planetButton");
componentsNamespace.stateMachine = new StateMachine(componentsNamespace.startButton, componentsNamespace.mapButton, componentsNamespace.timeButton, componentsNamespace.forceButton, componentsNamespace.planetButton);
componentsNamespace.stateMachine.init();

