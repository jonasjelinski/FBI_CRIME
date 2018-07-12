//implements the statemachine

var componentsNamespace = componentsNamespace || {};

componentsNamespace.stateMachine = new StateMachine();
componentsNamespace.stateMachine.init();
componentsNamespace.shortInfoText = new InfoText("shortPageText", "shortText", "das ist ein Text");
componentsNamespace.shortInfoText.appendThisCharToPage();
