class MapPage extends ParentPage{
	constructor(){
		super();
		//this.mainChart = new Map();
		//this.timeLine = new TimeLine();
	}

	init(){		
		this.initCharts();
		this.initControlls();
		this.addEventListeners();
	}

	initCharts(){
		this.mainChart = new Map();		
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart];
	}

	initControlls(){
		this.timeLine = new TimeLine();
		this.timeLine.appendThisCharToPage();
		this.crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenu = new DropDownMenu(this.crimeTypes);
		this.dropDownMenu.appendThisCharToPage();
		this.playButton = new PlayButton();		
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.dropDownMenu,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateMapYearAndMoving.bind(this));
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateCrimeType.bind(this), false);
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.playTimeLine.bind(this), false);
	}

	updateMapYearAndMoving(event){
		let year = event.detail.year,
			moving = event.detail.moving;
		this.mainChart.setYear(year);
		this.mainChart.setMoving(moving);
		this.mainChart.updatesHimself();

	}

	updateCrimeType(event){
		let crimeType = event.detail.selection;
		this.mainChart.setCrimeType(crimeType);
		this.mainChart.updatesHimself();
	}

	playTimeLine(){
		if(this.timeLine.isTimeLineMoving() === false){
			this.timeLine.playTimeLine();
		}
		else{
			this.timeLine.pauseTimeLine();
		}
		
	}
}