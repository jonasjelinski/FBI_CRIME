//this page shows the relation of propertycrimes and violentcrimes in states
//by appending a Universe-chart to the page
//it has a TimeLine and PlayButton as controlls
//trough the TimeLine the user can select which year he wants to see
//trough the PlayButton the user can controll if the planets of the Universe
//shell move or not

class UniversePage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = {};		
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();
		
	}

	initCharts(){
		this.mainChart = new Universe(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
	}

	initControlls(){
		this.timeLine = new TimeLine();
		this.timeLine.appendThisCharToPage();		
		this.playButton = new PlayButton();		
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateMapYear.bind(this));		
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.rotateUniverse.bind(this), false);
	}

	updateMapYear(event){
		let year = event.detail.year;			
		this.mainChart.setYear(year);		
		this.mainChart.updatesHimself();
	}

	rotateUniverse(){				
		this.mainChart.rotateOrStop();	
	}
}