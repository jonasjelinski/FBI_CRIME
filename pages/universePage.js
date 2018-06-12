class UniversePage extends ParentPage{
	constructor(){
		super();
		this.page = this.mainChart.rootElement;
		this.mainChart = {};
		//this.mainControll = new TimeLine();		
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
		console.log("rotateorstop");		
		this.mainChart.rotateOrStop();	
	}
}