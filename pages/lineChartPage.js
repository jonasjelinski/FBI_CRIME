class LineChartPage extends ParentPage{
	constructor(){
		super();
		//this.infoBox = new InfoBox();
		this.mainChart;
		this.charts;
	}

	init(){
		this.mainChart = new LineChart(this.pageId);
		this.mainChart.appendThisCharToPage();
		//this.charts = [this.mainChart]
	}
}