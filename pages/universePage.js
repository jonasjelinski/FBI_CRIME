class UniversePage extends ParentPage{
	constructor(){
		super();
		this.infoBox = new InfoBox();
		this.mainChart = new Universe();
		this.dropDownArray = this.getAllYears();
		this.rootElement = this.mainChart.rootElement;
		this.dropDownMenu = new DropDownMenu(this.rootElement, this.dropDownArray);
	}

	getAllYears(){
		let minYear = configNamespace.CONSTANTS.minYear,
			maxYear = configNamespace.CONSTANTS.maxYear,
			years = [];
		for(let year = minYear; year <= maxYear; year++){
			let yearAsString = (String(year));
			years.push(yearAsString);
		}
		return years;
	}

	drawPage(){
		super.drawPage();		
		//this.drawDropDownMenu();
	}

	drawDropDownMenu(){
		console.log("this.dropDownMenu", this.mainChart);
		this.dropDownMenu.doChart();
	}

}