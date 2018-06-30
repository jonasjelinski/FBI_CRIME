//this page shows a lineChart
//showing the crimerates over years for different crimes and states 
//by appending a LineChart-chart to the page
//it has a two DropDownMenus as controlls
//in dropDownMenuCrimes the user can select between different crimetypes
//to show or hide the line of the crimetype
//in dropDownMenuStates the user can switch between different states like Alaska

class LineChartPage extends ParentPage{
	constructor(pageId){
		super(pageId);
		 this.dropDownIdCrimes = configNamespace.DROP_DOWN_IDS.dropDownIdCrimes;
		 this.dropDownIdStates = configNamespace.DROP_DOWN_IDS.dropDownIdStates;
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addListeners();
	}

	initCharts(){
		this.mainChart = new LineChart(this.pageId);		
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart];		
	}

	initControlls(){
		this.initBubbleMenu();
		this.initDropDownCrimes();
		this.initDropDownStates();		
		this.controlls = [this.bubbleMenu, this.dropDownMenuStates];
	}

	initBubbleMenu(){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.bubbleMenu = new BubbleMenu(this.pageId,crimeTypes, "bubblecrimes");
		this.bubbleMenu.appendThisCharToPage();
	}

	initDropDownCrimes(){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenuCrimes = new DropDownMenu(this.pageId, crimeTypes, this.dropDownIdCrimes);
		this.dropDownMenuCrimes.appendThisCharToPage();
	}

	initDropDownStates(){
		let states = configNamespace.CONSTANTS.states;
		this.dropDownMenuStates = new DropDownMenu(this.pageId, states, this.dropDownIdStates);
		this.dropDownMenuStates.appendThisCharToPage();
	}

	addListeners(){
		this.dropDownMenuCrimes.eventTarget.addEventListener(this.dropDownMenuCrimes.selectionEvent, this.updateChartCrimeType.bind(this), false);
		this.dropDownMenuStates.eventTarget.addEventListener(this.dropDownMenuStates.selectionEvent, this.updateChartState.bind(this), false);
		this.bubbleMenu.eventTarget.addEventListener(this.bubbleMenu.selectionEvent, this.updateChartCrimeType.bind(this), false);
	}

	updateChartCrimeType(event){				
		let crimeType = event.detail.selection;
		this.mainChart.showOrHideLine(crimeType);
	}

	updateChartState(event){
		let state = event.detail.selection;
		this.mainChart.setState(state);
		this.mainChart.updatesHimself();
	}
}	