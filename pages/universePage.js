class UniversePage extends ParentPage{
	constructor(pageId){
		super();
		this.page = this.mainChart.rootElement;
		this.mainChart = {};
		//this.mainControll = new TimeLine();		
	}

	init(){
		this.mainChart = new Universe(pageId);
	}

}