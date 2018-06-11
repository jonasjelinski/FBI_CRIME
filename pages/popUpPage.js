class PopUpPage extends ParentPage{
	constructor(){
		super();
		this.pageId = "popup";
		this.page = this.mainChart.rootElement;
		this.mainChart = {};
		this.treeChart = {};
		this.mainControll = {};		
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();		
	}

	initCharts(){
		this.mainChart = new Sunburst(this.pageId);
		this.mainChart.appendThisCharToPage();
		//this.treeChart = new TreeChart();
		//this.treeChart.appendThisCharToPage();
		this.charts = [this.mainChart];	
	}

	initControlls(){
		this.mainControll = new CloseButton(this.pageId);
		this.mainControll.appendThisCharToPage();
		this.controlls = [this.mainControll];
	}

	addEventListeners(){
		this.mainControll.eventTarget.addEventListener(this.mainControll.clickEvent, this.closePage.bind(this), false);
	}

	closePage(){
		this.deletePage();
	}

	hasNoMainControll(){
		return undefined;
	}

}