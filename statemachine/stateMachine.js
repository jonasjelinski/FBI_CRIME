/*--- STATE MACHINE --*/

//the StateMachine handles the pages of the website
//each state shows a different page, e.g. MapPage
//each states shows a different shortInfoText describing the page
//each states shows a different longInfoText describing the page
//the shortInfoText is drawn if the page Changes
//the longInfoText id drawn if the user hits the infoButton
//the infoButton is drawn if another modul calls drawInfoPage
//drawInfoPage is called if the user clicks the infoButton 
//the listener for the infoButton is set in listeners and 
//the drawInfoPage is called in actions

class StateMachine{
	constructor(startButton, mapButton, timeLineButton, correlationButton, universeButton){
		this.activePage = undefined;
		this.activeButton = undefined;
		this.startPage = new StartPage("mainpage", "", infoTextsNamespace.startPageTexts);
		this.mapPage = new MapPage("mainpage");
		this.lineChartPage = new LineChartPage("mainpage");
		this.crimeCorrelationPage = new CrimeCorrelationPage("mainpage");
		this.universePage = new UniversePage("mainpage");
		this.infoPage = new InfoPage("infopage");
		this.impressumPage = new ImpressumPage("mainpage", infoTextsNamespace.legal.impressumText);
		this.dataRegulationPage= new DataRegulationPage("mainpage", infoTextsNamespace.legal.dataRegulationText);
		this.longInfoText = "";
		this.shortPageDescription = new InfoText("pageDescription", "pageDescription", "");
		this.buttonPageDescription = new InfoText("shortPageText", "shortText", "das ist ein Text");
		this.startButton = startButton;
		this.mapButton = mapButton;
		this.timeLineButton = timeLineButton;
		this.correlationButton = correlationButton;
		this.universeButton = universeButton;
	}

	//inits the statemachine
	//appends the shortInfoText to the tag with id "pageDescription"
	//adds an eventListener to the mapPage so the stateMachine receives
	//an event if the user clicked on the map
	init(){
		this.shortPageDescription.appendThisCharToPage();
		this.buttonPageDescription.appendThisCharToPage();
		this.mapPage.eventTarget.addEventListener(this.mapPage.onMapClicked, this.handleMapClick.bind(this));
		this.startPage.eventTarget.addEventListener(this.startPage.onClick, this.handleStartPageClick.bind(this));
		this.switchState(configNamespace.STATE_MACHINE.START);
	}

	//if the map has been clicked
	//the popupPge is drawn with its text
	//and the stateMachine cant be switched to another state anymore
	//this prevents the use from switching to another page
	handleMapClick(event){
		this.mapPage.setMapUnClickable();
		this.drawPopUpPage(event);
		this.drawPopUpTexts();
	}

	//draws the popUpPage.
	//if the popUpPage is closed by clicking the closeButton
	//onPopUpClosed is called
	drawPopUpPage(event){
		let state = event.detail.state,
			year = event.detail.year;
		this.popUpPage = new PopUpPage("popup", state, year);
		this.popUpPage.eventTarget.addEventListener("closeButton" ,this.onPopUpClosed.bind(this), false);
		this.popUpPage.init();
		this.popUpPage.drawPage();
	}

	//sets the mapPage clickable so states can be again selected
	//the stateMachine is on so the user can again switch different pages
	onPopUpClosed(){
		this.mapPage.setMapClickable();
		this.longInfoText = infoTextsNamespace.longPageDescription.mapPage;
	}

	//draws the short infoText for popup to descripe the popup
	//needs an own function because it is inside "popup" and not "pageDescription" like the others 
	drawPopUpTexts(){
		let popUpshortInfoText = new InfoText("popup", "pageDescriptionPopup", infoTextsNamespace.shortPageDescription.popupInfo);
		popUpshortInfoText.appendThisCharToPage();
		popUpshortInfoText.drawInfoText();
		this.longInfoText = infoTextsNamespace.longPageDescription.popupPage;
	}

	//if one startContainer has been clicked
	//this function switches the statemachine
	//to the side, which the startContainer describes
	handleStartPageClick(event){
		let chartId = event.detail.chartId;
		if(chartId === "startMap"){
			this.switchState(configNamespace.STATE_MACHINE.MAP);
		}
		else if (chartId === "startLineChart"){
			this.switchState(configNamespace.STATE_MACHINE.LINE_CHART);
		}
		else if (chartId === "startUniverse"){
			this.switchState(configNamespace.STATE_MACHINE.UNIVERSE);
		}
		else if(chartId === "startCorr"){
			this.switchState(configNamespace.STATE_MACHINE.CRIME_CORRELATION);
		}
	}

	//shows the text of the buttonPageDescription
	//is called in an action of actions
	//is used to show a pageDescription if a pageButton is hovered
	showButtonPageDescription(text){
		this.buttonPageDescription.setInfoText(text);
		this.buttonPageDescription.updatesHimself();
		this.buttonPageDescription.showInfoText();
	}

	hideButtonPageDescription(){
		this.buttonPageDescription.hideInfoText();
	}	

	//switches to state
	//each state draws a page and a short and a long intotext descriping the states
	switchState(state){
		this.currentState = state;
		switch(state){
		case configNamespace.STATE_MACHINE.START:
			this.drawStartPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.startPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.startPage);
			this.changeButtonPointerEvents(this.startButton);
			break;
		case configNamespace.STATE_MACHINE.MAP:
			this.drawMapPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.mapPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.mapInfo);
			this.changeButtonPointerEvents(this.mapButton);
			break;
		case configNamespace.STATE_MACHINE.LINE_CHART:
			this.drawLineChartPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.lineChartPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.lineChartInfo);
			this.changeButtonPointerEvents(this.timeLineButton);
			break;
		case configNamespace.STATE_MACHINE.CRIME_CORRELATION:
			this.drawCrimeCorrelationPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.correlationPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.correlationInfo);
			this.changeButtonPointerEvents(this.correlationButton);
			break;
		case configNamespace.STATE_MACHINE.UNIVERSE:
			this.drawUniversePage();
			this.longInfoText = infoTextsNamespace.longPageDescription.universePage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.universeInfo);
			this.changeButtonPointerEvents(this.universeButton);
			break;
		case configNamespace.STATE_MACHINE.IMPRESSUM:
			this.drawImpressumPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.impressumPage;
			this.drawShortInfoText("");
			this.enableButton(this.activeButton);
			break;
		case configNamespace.STATE_MACHINE.DATA_REGULATION:
			this.drawDataRegulationPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.dataRegulationPage;
			this.drawShortInfoText("");
			this.enableButton(this.activeButton);
		default:
			break;
		}
	}

	//cleanes the old page and draws a new one
	//by setting this.activPage and calling initAndDrawActivePage
	drawPage(page){
		this.cleanOldPage();
		this.activePage = page;
		this.initAndDrawActivePage();
	}

	changeButtonPointerEvents(button){
		let clickedButton= button,
			oldButton = this.activeButton;
		this.enableButton(oldButton);
		this.disableButton(clickedButton);
		this.activeButton = clickedButton;	
	}

	enableButton(button){
		if(button){
			button.style("pointer-events", "all");
		}		
	}

	disableButton(button){
		if(button){
			button.style("pointer-events", "none");
		}		
	}

	drawStartPage(){
		this.drawPage(this.startPage);
	}

	drawMapPage(){
		this.drawPage(this.mapPage);
	}

	drawLineChartPage(){
		this.drawPage(this.lineChartPage);
	}

	drawCrimeCorrelationPage(){
		this.drawPage(this.crimeCorrelationPage);
	}

	drawUniversePage(){
		this.drawPage(this.universePage);
	}

	drawImpressumPage(){
		this.drawPage(this.impressumPage);
	}

	drawDataRegulationPage(){
		this.drawPage(this.dataRegulationPage);
	}

	initAndDrawActivePage(){
		if(this.activePage !== undefined){
			this.activePage.init();
			this.activePage.drawPage();		
		}
	}

	//shows the infopage if its classvariable isVisible is true
	//else hides it
	drawInfoPage(){		
		if(this.infoPage.isVisible){
			this.infoPage.deletePage();
			this.infoPage.setInfoText(this.longInfoText);
			this.infoPage.init();
			this.infoPage.drawPage();
		}
		else{
			this.infoPage.deletePage();
		}
		this.infoPage.toggleVisibility();
	}

	drawShortInfoText(text){
		this.shortPageDescription.setInfoText(text);
		this.shortPageDescription.updatesHimself();
	}

	//deletes the infoPage and the activePage
	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();
			this.infoPage.deletePage();
		}
		if(this.popUpPage){
			this.popUpPage.deletePage();
		}
	}
}
