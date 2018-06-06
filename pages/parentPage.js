class ParentPage{
	constructor(){
		this.infoBox = new InfoBox();
		this.mainChart = new Universe();
		this.width = htmlelementsNamespace.PARENT_PAGE.width;
		this.height = htmlelementsNamespace.PARENT_PAGE.height;
	}

	drawPage(){
		this.mainChart.doChart();
	}

	updatePage(){
		this.mainChart.killsHimself();
		this.drawPage();
	}	

	deletePage(){
		this.mainChart.killsHimself();		
	}
}