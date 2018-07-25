/*---PAGE: START--*/

//The StartPage
//extends the TextPage
//to show the text of the StartPage
//which is set in the constructor

class StartPage extends TextPage{
	constructor(pageId = "mainpage", startText = "", chartTextObject){
		super(pageId, htmlelementsNamespace.startPage, htmlelementsNamespace.startPage.infoTextId, startText);
		this.eventTarget = new EventTarget();
		this.onClick = "onClick";
		this.chartTextObject = chartTextObject;
	}

	init(){
		super.init();
		this.initCharts();	
		this.addCharts();
		this.addEventListeners();		
	}

	initCharts(){
			this.startMap = new StartContainer(this.pageId, "startMap", "./pictures/MapChart.png", "mapPic", "MapChart", "mapText", this.chartTextObject.map.infoText, this.chartTextObject.map.buttonText),
			this.startLineChart = new StartContainer(this.pageId, "startLineChart", "./pictures/LineChart.png", "lineChartPic", "LineChart", "lineChartText",  this.chartTextObject.lineChart.infoText, this.chartTextObject.lineChart.buttonText),
			this.startCorrelation = new StartContainer(this.pageId, "startCorr", "./pictures/CorrelationChart.png", "corrPic", "CorrelationChart", "corrText",  this.chartTextObject.correlation.infoText, this.chartTextObject.correlation.buttonText),
			this.startUniverse = new StartContainer(this.pageId, "startUniverse", "./pictures/UniverseChart.png", "universePic", "UniverseChart", "universeText",  this.chartTextObject.universe.infoText, this.chartTextObject.universe.buttonText);
	}

	addCharts(){
		this.startMap.appendThisCharToPage();
		this.startLineChart.appendThisCharToPage();
		this.startCorrelation.appendThisCharToPage();
		this.startUniverse.appendThisCharToPage();		
		this.charts.push(this.startMap, this.startLineChart, this.startCorrelation, this.startUniverse);
	}

	addEventListeners(){
		this.startMap.eventTarget.addEventListener(this.startMap.onClick, this.handleClick.bind(this), false);
		this.startLineChart.eventTarget.addEventListener(this.startLineChart.onClick, this.handleClick.bind(this), false);
		this.startCorrelation.eventTarget.addEventListener(this.startCorrelation.onClick, this.handleClick.bind(this), false);
		this.startUniverse.eventTarget.addEventListener(this.startUniverse.onClick, this.handleClick.bind(this), false);
	}

	handleClick(clickEvent){
		let event = new Event(this.onClick);
		event.detail = clickEvent.detail;
		this.eventTarget.dispatchEvent(event);	
	}


}