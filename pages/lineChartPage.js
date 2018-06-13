class LineChartPage extends ParentPage{
	constructor(pageId){
		super(pageId);
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
		this.initDropDownCrimes();
		this.initDropDownStates();		
		this.controlls = [this.dropDownMenuCrimes, this.dropDownMenuStates];
	}

	initDropDownCrimes(){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenuCrimes = new DropDownMenu(this.pageId, crimeTypes);
		this.dropDownMenuCrimes.appendThisCharToPage();
	}

	initDropDownStates(){
		let states = configNamespace.CONSTANTS.states;
		this.dropDownMenuStates = new DropDownMenu(this.pageId, states);
		this.dropDownMenuStates.appendThisCharToPage();
	}

	addListeners(){
		this.dropDownMenuCrimes.eventTarget.addEventListener(this.dropDownMenuCrimes.selectionEvent, this.updateChartCrimeType.bind(this), false);
		this.dropDownMenuStates.eventTarget.addEventListener(this.dropDownMenuStates.selectionEvent, this.updateChartState.bind(this), false);
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