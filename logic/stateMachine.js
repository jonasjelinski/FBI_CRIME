//the StateMachine handles the pages of the website
//each state shows a different page, e.g. MapPage

class StateMachine{
	constructor(){
		this.activePage = undefined;
		this.mapPage = new MapPage("mainpage");
		this.lineChartPage = new LineChartPage("mainpage");
		this.crimeCorrelationPage = new CrimeCorrelationPage("mainpage");
		this.universePage = new UniversePage("mainpage");	
		this.popupPage	 = new PopUpPage("popup");
		this.infoPage	 = new InfoPage("infopage");
	}

	switchState(state){
		switch(state){
		case configNamespace.STATE_MACHINE.MAP: this.drawMapPage();
			break;
		case configNamespace.STATE_MACHINE.LINE_CHART:this.drawLineChartPage();
			break;
		case configNamespace.STATE_MACHINE.CRIME_CORRELATION:this.drawCrimeCorrelationPage();
			break;
		case configNamespace.STATE_MACHINE.UNIVERSE:this.drawUniversePage();
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
		this.infoPage.init();
		this.infoPage.drawPage();
	}

	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();	
		}		
	}
}