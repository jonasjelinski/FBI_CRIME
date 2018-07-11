//the StateMachine handles the pages of the website
//each state shows a different page, e.g. MapPage

class StateMachine{
	constructor(){
		this.activePage = undefined;
		this.startPage = new StartPage("mainpage");
		this.mapPage = new MapPage("mainpage");
		this.lineChartPage = new LineChartPage("mainpage");
		this.crimeCorrelationPage = new CrimeCorrelationPage("mainpage");
		this.universePage = new UniversePage("mainpage");	
		this.infoPage = new InfoPage("infopage");
		this.longInfoText = "";	
		this.shortInfoText = new InfoText("pageDescription", "pageDescription", "das");	
	}

	init(){
		this.shortInfoText.appendThisCharToPage();
	}

	switchState(state){
		this.currentState = state;
		switch(state){
		case configNamespace.STATE_MACHINE.START:
			this.drawStartPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.startPage;
			this.drawShortInfoText(this.longInfoText);			
			break;
		case configNamespace.STATE_MACHINE.MAP: 
			this.drawMapPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.mapPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.mapInfo);
			break;
		case configNamespace.STATE_MACHINE.LINE_CHART:
			this.drawLineChartPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.lineChartPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.lineChartInfo);
			break;
		case configNamespace.STATE_MACHINE.CRIME_CORRELATION:
			this.drawCrimeCorrelationPage();
			this.longInfoText = infoTextsNamespace.longPageDescription.correlationPage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.correlationInfo);
			break;
		case configNamespace.STATE_MACHINE.UNIVERSE:this.drawUniversePage();
			this.longInfoText = infoTextsNamespace.longPageDescription.universePage;
			this.drawShortInfoText(infoTextsNamespace.shortPageDescription.universeInfo);
			break;
		default:
			break;
		}
	}

	drawStartPage(){
		this.cleanOldPage();
		this.activePage = this.startPage;
		this.initAndDrawActivePage();
	}

	drawMapPage(){	
		console.log("drawMapPage");
		this.cleanOldPage();
		this.activePage = this.mapPage;	
		this.initAndDrawActivePage();
	}

	drawLineChartPage(){		
		this.cleanOldPage();
		this.activePage = this.lineChartPage;
		this.initAndDrawActivePage();

	}

	drawCrimeCorrelationPage(){
		this.cleanOldPage();
		this.activePage = this.crimeCorrelationPage;		
		this.initAndDrawActivePage();
	}

	drawUniversePage(){
		this.cleanOldPage();
		this.activePage = this.universePage;		
		this.initAndDrawActivePage();
	}

	initAndDrawActivePage(){
		if(this.activePage !== undefined){
			this.activePage.init();
			this.activePage.drawPage();		}
	}

	drawInfoPage(){	
		this.infoPage.deletePage();
		this.infoPage.setInfoText(this.longInfoText);
		this.infoPage.init();
		this.infoPage.drawPage();
	}

	drawShortInfoText(text){
		this.shortInfoText.setInfoText(text);	
		this.shortInfoText.updatesHimself();
	}

	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();
			this.infoPage.deletePage();	
		}		
	}
}