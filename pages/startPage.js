//The StartPage
//extends the TextPage
//to show the text of the StartPage
//which is set in the constructor

class StartPage extends TextPage{
	constructor(pageId = "mainpage", startText = ""){
		super(pageId, htmlelementsNamespace.startPage, htmlelementsNamespace.startPage.infoTextId, startText);
		this.eventTarget = new EventTarget();
		this.onClick = "onClick";
	}

	init(){
		super.init();
		this.initCharts();	
		this.addCharts();
		this.addEventListeners();		
	}

	initCharts(){
			this.startMap = new StartContainer(this.pageId, "startMap", "./pictures/MapChart.png", "mapPic", "MapChart", "mapText", "This page gives you a first overview of the whole United States and you can see all the crimes over the entire period.", "Please click on the Map-Buttonto try it."),
			this.startLineChart = new StartContainer(this.pageId, "startLineChart", "./pictures/LineChart.png", "lineChartPic", "LineChart", "lineChartText", "On this page, you can look at individual states and the crimes committed there in an annual comparison.", "Please click on the Timeline-Buttonto try it."),
			this.startCorrelation = new StartContainer(this.pageId, "startCorr", "./pictures/CorrelationChart.png", "corrPic", "CorrelationChart", "corrText", "For this page, the correlation was calculated for all crimes. You can investigate the result further here.", "Pleae click on the Correlation-Button to try it."),
			this.startUniverse = new StartContainer(this.pageId, "startUniverse", "./pictures/UniverseChart.png", "universePic", "UniverseChart", "universeText", "An overview of the distribution of violent and property crimes can be found on this page.", "Pleae click on the Universe-Buttonto try it.");
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