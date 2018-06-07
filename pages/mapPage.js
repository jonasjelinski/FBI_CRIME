class MapPage extends ParentPage{
	constructor(){
		super();
		//this.mainChart = new Map();
		//this.mainControll = new TimeLine();
	}

	init(){
		this.mainChart = new Map(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
		//this.charts = [this.mainChart]
	}
}