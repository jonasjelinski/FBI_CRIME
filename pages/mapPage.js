/*---PAGE: MAP--*/

//this page shows an intercative Map of the USA
//representing the crimerate for each state as color
//by appending a Map-chart to the page
//it has a TimeLine, a DropDownMenu and PlayButton as controlls
//trough the TimeLine the user can select which year he wants to see
//trough the DropDownMenu the user can switch between different crimeTypes
//if the PlayButton is clicked the TimeLine is running forward in time
//it can be stopped again through the PlayButton
//if the MapChart dispatches an clickEvent this page copies the event
//and dispatches it again, so other other Pages can react to this event

class MapPage extends ParentPage{
	constructor(pageId){
		super(pageId);
		this.htmlElement = htmlelementsNamespace.mapPage;
		this.dropDownIdMap = "Map";
		this.timeLineId = "Map";
		this.playButtonId = "Map";
		this.eventTarget = new EventTarget();
		this.onMapClicked = "onClick";
		this.colorLegendTitle = "Ratio: min/max"; 
		this.colorLegendId = "Map";
		this.colorLegendStartLabel = "min"; 
		this.colorLegendEndLabel = "max";	
		this.startColor = "rgb(255,253,109)";
		this.endColor = "rgb(232,12,5)";
		this.playButtonText = this.htmlElement.playButtonText;
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();
	}

	initCharts(){
		this.mainChart = new Map();
		this.colorLegend = new ColorLegend(this.colorLegendId, this.pageId, this.colorLegendTitle, this.colorLegendStartLabel, this.colorLegendEndLabel, this.startColor, this.endColor);
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart,this.colorLegend];
		this.colorLegend.appendThisCharToPage();
	}

	initControlls(){
		this.timeLine = new TimeLine(this.pageId, this.timeLineId);
		this.timeLine.appendThisCharToPage();
		this.crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenu = new DropDownMenu(this.pageId, this.crimeTypes, this.dropDownIdMap);
		this.dropDownMenu.appendThisCharToPage();
		this.playButton = new PlayButton(this.pageId, this.playButtonId, this.playButtonText);
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.dropDownMenu,this.playButton];
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateMapYearAndMoving.bind(this));
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateCrimeType.bind(this), false);
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.playTimeLine.bind(this), false);
		this.mainChart.eventTarget.addEventListener(this.playButton.onClick, this.sendMapClickEvent.bind(this), false);
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

	//controlls the timeLine
	//if the timeLine allready moves it'll be paused
	//else it starts playing 
	//while the timeLine is playing the map can't be clicked
	playTimeLine(){
		if(this.timeLine.isTimeLineMoving() === false){
			this.mainChart.mapNotClickable();
			this.timeLine.playTimeLine();
		}
		else{
			this.mainChart.mapClickable();
			this.timeLine.pauseTimeLine();
		}

	}
	
	sendMapClickEvent(ev){
		let event = new CustomEvent(this.onMapClicked, {detail:{state: ev.detail.state, year: ev.detail.year}});
		this.eventTarget.dispatchEvent(event);
	}

	//is used as a setter
	//so other moduls then this class can set the map clickable
	setMapClickable(){
		this.mainChart.mapClickable();
	}

	setMapUnClickable(){
		this.mainChart.mapNotClickable()
	}
}
