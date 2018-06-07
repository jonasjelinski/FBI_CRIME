class PopUpPage extends ParentPage{
	constructor(){
		super();
		this.page = this.mainChart.rootElement;
		//this.mainChart = new PopUp();
		this.mainControll = this.hasNoMainControll();
		//this.closeButton = ????	
	}

	drawPage(){
		super();
	}

	hasNoMainControll(){
		return undefined;
	}

}