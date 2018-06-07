class PopUpPage extends ParentPage{
	constructor(){
		super();
		this.page = this.mainChart.rootElement;
		//this.mainChart = new PopUp();
		this.mainControll = this.hasNoMainControll();
		//this.closeButton = ????	
	}

	init(){
		this.mainChart = new PopUp(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
		//this.charts = [this.mainChart]
	}

	drawPage(){
		super();
	}

	hasNoMainControll(){
		return undefined;
	}

}