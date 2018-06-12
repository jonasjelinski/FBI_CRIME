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
		//console.log("drawMapPage", this.activePage);
		this.initAndDrawActivePage();
	}

	drawLineChartPage(){		
		this.cleanOldPage();
		this.activePage = this.lineChartPage;		
		//console.log("drawLineChartPage", this.activePage, "this.lineChartPage", this.lineChartPage);
		this.initAndDrawActivePage();

	}

	drawCrimeCorrelationPage(){
		this.cleanOldPage();
		this.activePage = this.crimeCorrelationPage;		
		//console.log("drawCrimeCorrelationPage", this.activePage);
		this.initAndDrawActivePage();
	}

	drawUniversePage(){
		this.cleanOldPage();
		this.activePage = this.universePage;		
		//console.log("drawUniversePage", this.activePage);
		this.initAndDrawActivePage();
	}

	initAndDrawActivePage(){
		if(this.activePage !== undefined){
			this.activePage.init();
			this.activePage.drawPage();	
		}
	}

	drawInfoPage(){
		console.log("infopage");
		this.infoPage.init();
		this.infoPage.drawPage();
	}

	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();	
		}		
	}
}