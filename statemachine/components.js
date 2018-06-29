//implements the statemachine

var componentsNamespace = componentsNamespace || {};

componentsNamespace.stateMachine = new StateMachine();
componentsNamespace.crimes = commonfunctionsNamespace.getAllCrimeTypes();
componentsNamespace.bubbleMenu = new BubbleMenu("mainpage",componentsNamespace.crimes, "id1");
