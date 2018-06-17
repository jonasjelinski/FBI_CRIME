//this page shows an intercative Map of the USA
//representing the crimerate for each state as color
//by appending a Map-chart to the page
//it has a TimeLine, a DropDownMenu and PlayButton as controlls
//trough the TimeLine the user can select which year he wants to see
//trough the DropDownMenu the user can switch between different crimeTypes
//if the PlayButton is clicked the TimeLine is running forward in time 
//it can be stopped again through the PlayButton

class MapPage extends ParentPage{
	constructor(pageId){
		super(pageId);	
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
		this.timeLine = new TimeLine(this.pageId);
		this.timeLine.appendThisCharToPage();
		this.crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenu = new DropDownMenu(this.pageId, this.crimeTypes);
		this.dropDownMenu.appendThisCharToPage();
		this.playButton = new PlayButton(this.pageId);		
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.dropDownMenu,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateMapYearAndMoving.bind(this));
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateCrimeType.bind(this), false);
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.playTimeLine.bind(this), false);
		this.mainChart.eventTarget.addEventListener(this.playButton.onClick, this.showPopup.bind(this), false);
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

	showPopup(event){
		let state = event.detail.state,
			year = event.detail.year;
		let popUpPage = new PopUpPage("popup", state, year);
		popUpPage.init();
		popUpPage.drawPage();		
	}
}