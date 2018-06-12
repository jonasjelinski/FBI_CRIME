class LineChartPage extends ParentPage{
	constructor(pageId){
		super();
		//this.infoBox = new InfoBox();		
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
		let dropDownArray = commonfunctionsNamespace.getAllCrimeTypes();
		this.dropDownMenu = new DropDownMenu(this.pageId, dropDownArray);
		this.dropDownMenu.appendThisCharToPage();
		this.controlls = [this.dropDownMenu];
	}

	addListeners(){
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateChartLines.bind(this), false);
	}

	updateChartLines(event){				
		let crimeType = event.detail.selection;
		this.mainChart.showOrHideLine(crimeType);
	}
}	