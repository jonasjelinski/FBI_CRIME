class LineChartPage extends ParentPage{
	constructor(){
		super();
		//this.infoBox = new InfoBox();
	}

	init(){
		this.mainChart = new LineChart(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
		//this.charts = [this.mainChart]
	}
}	