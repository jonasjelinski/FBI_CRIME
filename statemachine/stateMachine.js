//the StateMachine handles the pages of the website
//each state shows a different page, e.g. MapPage

class StateMachine{
	constructor(){
		this.activePage = undefined;
		this.mapPage = new MapPage("mainpage");
		this.lineChartPage = new LineChartPage("mainpage");
		this.crimeCorrelationPage = new CrimeCorrelationPage("mainpage");
		this.universePage = new UniversePage("mainpage");	
		this.infoPage = new InfoPage("infopage");
		this.infoText = "";
	}

	switchState(state){
		this.currentState = state;
		switch(state){
		case configNamespace.STATE_MACHINE.MAP: 
			this.drawMapPage();
			this.infoText = infoTextsNamespace.pageDescription.mapPage;
			this.drawShortInfoText = "Hier kommt die krz Map Info";
			break;
		case configNamespace.STATE_MACHINE.LINE_CHART:
			this.drawLineChartPage();
			this.infoText = infoTextsNamespace.pageDescription.lineChartPage;
			this.drawShortInfoText = "Hier kommt die krz lineChartPage Info";
			break;
		case configNamespace.STATE_MACHINE.CRIME_CORRELATION:
			this.drawCrimeCorrelationPage();
			this.infoText = infoTextsNamespace.pageDescription.correlationPage;
			this.drawShortInfoText = "Hier kommt die krz Korrelation Info";
			break;
		case configNamespace.STATE_MACHINE.UNIVERSE:this.drawUniversePage();
			this.infoText = infoTextsNamespace.pageDescription.universePage;
			this.drawShortInfoText = infoTextsNamespace.pageDescription.universePage;
			break;
		default:
			break;
		}
	}

	drawMapPage(){	
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
			this.activePage.drawPage();	
		}
	}

	drawInfoPage(){	
		this.infoPage.setInfoText(this.infoText);
		this.infoPage.init();
		this.infoPage.drawPage();
	}

	drawInfoBox(){
		
	}

	drawShortInfoText(){

	}

	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();	
		}		
	}
}