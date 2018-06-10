class UniversePage extends ParentPage{
	constructor(){
		super();
		this.page = this.mainChart.rootElement;
		this.mainChart = {};
		//this.mainControll = new TimeLine();		
	}

	init(){
		this.mainChart = new Universe(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
	}
}