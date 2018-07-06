//this page shows the relation of propertycrimes and violentcrimes in states
//by appending a Universe-chart to the page
//it has a TimeLine and PlayButton as controlls
//trough the TimeLine the user can select which year he wants to see
//trough the PlayButton the user can controll if the planets of the Universe
//shell move or not
//it also contains a colorLegend to explain the meaning of the planets

class UniversePage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.htmlElement = htmlelementsNamespace.universePage;
		this.colorLegendTitle = "Ratio: ViolentCrimes/Propertycrimes"; 		
		this.colorLegendStartLabel = "Propertycrimes"; 		
		this.colorLegendEndLabel = "ViolentCrimes";	
		this.timeLineId = "Universe";
		this.playButtonId = "Universe";
		this.colorLegendId = "Universe";
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();		
	}

	initCharts(){
		this.mainChart = new Universe(this.pageId);
		this.colorLegend = new ColorLegend(this.colorLegendId, this.pageId, this.colorLegendTitle, this.colorLegendStartLabel, this.colorLegendEndLabel);
		this.charts = [this.mainChart, this.colorLegend ];
		this.mainChart.appendThisCharToPage();
		this.colorLegend.appendThisCharToPage();
	}

	initControlls(){
		this.timeLine = new TimeLine(this.pageId, this.timeLineId);
		this.timeLine.appendThisCharToPage();		
		this.playButton = new PlayButton(this.pageId, this.playButtonId);		
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