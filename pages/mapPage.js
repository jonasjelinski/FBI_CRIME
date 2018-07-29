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
		this.colorLegendStartLabel = this.htmlElement.colorLegendStartLabel;
		this.colorLegendEndLabel = this.htmlElement.colorLegendEndLabel;
		this.colorLegendTitle = this.htmlElement.colorLegendTitle;
		this.colorLegendValueDescription = this.htmlElement.colorLegendValueDescription;
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
		this.mainChart = new Map(this.pageId);
		this.mainChart.appendThisCharToPage();
		this.colorLegend = new ColorLegend(this.colorLegendId, this.pageId, this.colorLegendTitle, this.colorLegendStartLabel, this.colorLegendEndLabel, this.startColor, this.endColor, this.colorLegendValueDescription);		
		this.charts = [this.mainChart,this.colorLegend];
		this.colorLegend.appendThisCharToPage();
	}

	initControlls(){
		let niceWrittenCrimes = this.crimeTypes = configNamespace.NICE_WRITTEN_CRIMENAMES;
		this.timeLine = new TimeLine(this.pageId, this.timeLineId);
		this.timeLine.appendThisCharToPage();		
		this.crimeTypes = niceWrittenCrimes.slice(0, niceWrittenCrimes.length-2);	
		this.dropDownMenu = new DropDownMenu(this.pageId, this.crimeTypes, this.dropDownIdMap);
		this.dropDownMenu.appendThisCharToPage();
		this.playButton = new PlayButton(this.pageId, this.playButtonId, this.playButtonText);
		this.playButton.appendThisCharToPage();
		this.controlls = [this.timeLine,this.dropDownMenu,this.playButton];
		this.canShowPopup = true;
	}

	addEventListeners(){
		this.timeLine.eventTarget.addEventListener(this.timeLine.onUpdate, this.updateMapYearAndMoving.bind(this));
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateCrimeType.bind(this), false);
		this.playButton.eventTarget.addEventListener(this.playButton.onClick, this.playTimeLine.bind(this), false);
		this.mainChart.eventTarget.addEventListener(this.playButton.onClick, this.sendMapClickEvent.bind(this), false);
		this.mainChart.eventTarget.addEventListener(this.mainChart.onBuilded, this.updateColorLegend.bind(this), false);
	}

	updateMapYearAndMoving(event){
		let year = event.detail.year,
			moving = event.detail.moving;
		this.mainChart.setYear(year);
		this.mainChart.updatesHimself();
	}

	updateCrimeType(event){
		let crimeType = event.detail.selection;
		crimeType = configNamespace.REAL_CRIME_NAMES[crimeType];
		this.mainChart.setCrimeType(crimeType);
		this.mainChart.updatesHimself();
	}

	//controlls the timeLine
	//if the timeLine allready moves it'll be paused
	//else it starts playing
	//while the timeLine is playing the map can't be clicked
	playTimeLine(){
		if(this.timeLine.isTimeLineMoving() === false){
			this.timeLine.playTimeLine();
			this.setPopUpNotShowAble();
			this.mainChart.isMoving(true);
		}
		else{
			this.setPopUpShowAble();
			this.timeLine.pauseTimeLine();
			this.mainChart.isMoving(false);
		}
	}

	setPopUpNotShowAble(){
		this.canShowPopup = false;
	}

	setPopUpShowAble(){
		this.canShowPopup = true;
	}

	sendMapClickEvent(ev){
		if(this.canShowPopup){
			let event = new CustomEvent(this.onMapClicked, {detail:{state: ev.detail.state, year: ev.detail.year}});
			this.eventTarget.dispatchEvent(event);
		}
	}

	updateColorLegend(){
		let maxLegendValue,
			minLegendValue;
		maxLegendValue = this.mainChart.getMaxCrime();
		minLegendValue = this.mainChart.getMinCrime();
		this.colorLegend.updateLegendValueAndDrawChart(minLegendValue, maxLegendValue);
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
