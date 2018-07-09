//implements the statemachine

var componentsNamespace = componentsNamespace || {};

componentsNamespace.stateMachine = new StateMachine();
componentsNamespace.stateMachine.init();
componentsNamespace.shortInfoText = new InfoText("shortPageText", "chartId", "das ist ein Text");
componentsNamespace.shortInfoText.appendThisCharToPage();


