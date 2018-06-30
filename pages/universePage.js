//this page shows the relation of propertycrimes and violentcrimes in states
//by appending a Universe-chart to the page
//it has a TimeLine and PlayButton as controlls
//trough the TimeLine the user can select which year he wants to see
//trough the PlayButton the user can controll if the planets of the Universe
//shell move or not
//it also contains a ColorLegend to explain the meaning of the planets

class UniversePage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = {};
		this.ColorLegendTitle = "Ratio: ViolentCrimes/Propertycrimes"; 		
		this.ColorLegendStartLabel = "Propertycrimes"; 		
		this.ColorLegendEndLabel = "ViolentCrimes"; 		
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();
		
	}

	initCharts(){
		this.mainChart = new Universe(this.pageId);
		this.colorLegend = new ColorLegend(this.pageId, this.ColorLegendTitle, this.ColorLegendStartLabel, this.ColorLegendEndLabel);
		this.charts = [this.mainChart, this.colorLegend ];
		this.mainChart.appendThisCharToPage();
		this.colorLegend.appendThisCharToPage();
	}

	initControlls(){
		this.timeLine = new TimeLine();
		this.timeLine.appendThisCharToPage();		
		this.playButton = new PlayButton();		
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateUniverseYear.bind(this));		
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.rotateUniverse.bind(this), false);
	}

	updateUniverseYear(event){
		let year = event.detail.year;			
		this.mainChart.setYear(year);		
		this.mainChart.updatesHimself();
	}

	rotateUniverse(){				
		this.mainChart.rotateOrStop();	
	}
}