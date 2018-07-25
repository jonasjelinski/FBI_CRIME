/*--- COMPONENTS --*/

//implements the statemachine
//the stateMachine controlls the logic of all pages
//each state shows a different page

var componentsNamespace = componentsNamespace || {};

componentsNamespace.stateMachine = new StateMachine();
componentsNamespace.stateMachine.init();
