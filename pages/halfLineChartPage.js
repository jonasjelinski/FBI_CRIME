/*---PAGE: HALF LINE CHART--*/

//this page shows one lineChart and its controlls
//showing the crimerates over years for different crimes and states 
//by appending a LineChart-chart to the page
//it has a DropDownMenu and a BubbleMenu as controlls
//in bubbleMenu the user can select between different crimetypes
//to show or hide the line of the crimetype
//in dropDownMenuStates the user can switch between different states like Alaska

class HalfLineChartPage extends ParentPage{
	constructor(pageId, lineChartId, dropDownIdStates, bubbleMenuId){
		super(pageId);
		this.pageId = pageId;
		this.htmlElement = htmlelementsNamespace.lineChartPage;
		this.dropDownIdStates = dropDownIdStates;
		this.bubbleMenuId = bubbleMenuId;
		this.lineChartId = lineChartId;
	}

	init(){

		this.initCharts();
		this.initControlls();
		this.addListeners();
	}

	initCharts(){
		this.mainChart = new LineChart(this.pageId, this.lineChartId);		
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart];	
	}

	initControlls(){
		this.initBubbleMenu();
		this.initDropDownStates();		
		this.controlls = [this.bubbleMenu, this.dropDownMenuStates];
	}

	initBubbleMenu(){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes().sort();   
		this.bubbleMenu = new BubbleMenu(this.pageId,crimeTypes, this.bubbleMenuId);
		this.bubbleMenu.appendThisCharToPage();
	}

	initDropDownStates(){
		let states = configNamespace.STATES_AND_CRIMES.states;
		this.dropDownMenuStates = new DropDownMenu(this.pageId, states, this.dropDownIdStates);
		this.dropDownMenuStates.appendThisCharToPage();
	}

	addListeners(){
		this.dropDownMenuStates.eventTarget.addEventListener(this.dropDownMenuStates.selectionEvent, this.handleDropDown.bind(this), false);
		this.bubbleMenu.eventTarget.addEventListener(this.bubbleMenu.selectionEvent, this.updateChartCrimeType.bind(this), false);
	}

	updateChartCrimeType(event){				
		let crimeType = event.detail.selection;
		this.mainChart.showOrHideLine(crimeType);
	}

	handleDropDown(event){
		this.resetBubbleMenu();
		this.updateChartState(event);
	}

	resetBubbleMenu(){
		this.bubbleMenu.updatesHimself();
	}

	updateChartState(event){
		let state = event.detail.selection;
		this.mainChart.setState(state);
		this.mainChart.updatesHimself();
	}
}	