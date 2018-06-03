class ParentPage{
	constructor(){
		this.infoBox = new InfoBox(),
		this.mainChart = new Universe();
	}

	drawPage(){
		this.mainChart.doChart();
	}

	updatePage(){
		this.mainChart.killsHimself();
		this.drawPage();
	}

	showTextBox(){
		this.infoBox().doChart();
	}

	closeTextBox(){
		this.infoBox.killsHimself();
	}

	deletePage(){
		this.mainChart.killsHimself();		
	}
}