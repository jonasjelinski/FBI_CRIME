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
			this.infoText = "Hier kommt die Map Info";
			this.drawShortInfoText = "Hier kommt die krz Map Info";
			break;
		case configNamespace.STATE_MACHINE.LINE_CHART:
			this.drawLineChartPage();
			this.infoText = "Hier kommt die lineChartPage Info";
			this.drawShortInfoText = "Hier kommt die krz lineChartPage Info";
			break;
		case configNamespace.STATE_MACHINE.CRIME_CORRELATION:
			this.drawCrimeCorrelationPage();
			this.infoText = "Hier kommt die Korrelation Info";
			this.drawShortInfoText = "Hier kommt die krz Korrelation Info";
			break;
		case configNamespace.STATE_MACHINE.UNIVERSE:this.drawUniversePage();
			this.infoText = "Hier kommt die Universe Info";
			this.drawShortInfoText = "Hier kommt die krz Universe Info";
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