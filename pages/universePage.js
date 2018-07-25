/*---PAGE: UNIVERSE--*/

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
		this.playButtonText = this.htmlElement.playButtonText;
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
		this.playButton = new PlayButton(this.pageId, this.playButtonId, this.playButtonText);		
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateUniverseYear.bind(this));		
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.rotateOrStopUniverse.bind(this), false);
	}

	//draws the universe with a new year
	//if the universe rotated before
	//it'll continue with the rotation
	updateUniverseYear(event){
		let newYear = event.detail.year,
			oldYear = this.mainChart.getYear(); 
		if(newYear!== oldYear){
			this.mainChart.setYear(newYear);		
			this.mainChart.updatesHimself();
			if(this.playButton.isPlaying){
				this.mainChart.animateRotation();
			}
		}		
		
	}

	rotateOrStopUniverse(){					
		this.mainChart.rotateOrStop();	
	}
}