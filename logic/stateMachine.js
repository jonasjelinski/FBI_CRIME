class StateMachine{
	constructor(){
		this.activePage = undefined;
		this.mapPage = new MapPage();
		this.lineChartPage = new LineChartPage();
		this.crimeCorrelationPage = new CrimeCorrelationPage();
		this.universePage = new UniversePage();		
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
		this.drawActivePage();
	}

	drawLineChartPage(){		
		this.cleanOldPage();
		this.activePage = this.lineChartPage;
		//console.log("drawLineChartPage", this.activePage, "this.lineChartPage", this.lineChartPage);
		this.drawActivePage();

	}

	drawCrimeCorrelationPage(){
		this.cleanOldPage();
		this.activePage = this.crimeCorrelationPage;
		//console.log("drawCrimeCorrelationPage", this.activePage);
		this.drawActivePage();
	}

	drawUniversePage(){
		this.cleanOldPage();
		this.activePage = this.universePage;
		//console.log("drawUniversePage", this.activePage);
		this.drawActivePage();
	}

	drawActivePage(){
		if(this.activePage !== undefined){
			this.activePage.drawPage();	
		}
	}

	cleanOldPage(){
		if(this.activePage !== undefined){
			this.activePage.deletePage();	
		}		
	}
}