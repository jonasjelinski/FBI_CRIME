class PopUpPage extends ParentPage{
	constructor(pageId = "popup", state = configNamespace.CONSTANTS.states[0], year = 2000){
		super(pageId);
		this.pageId = pageId;
		this.htmlelement = htmlelementsNamespace.POPUP_PAGE;
		this.htmlElementID = this.htmlelement.htmlid;
		this.state = state;	
		this.year = year;		
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();		
	}

	initCharts(){
		this.mainChart = new Sunburst(this.pageId, this.state, this.year);
		this.mainChart.appendThisCharToPage();
		this.treeChart = new Tree(this.pageId, this.state, this.year);
		this.treeChart.appendThisCharToPage();
		this.charts = [this.mainChart, this.treeChart];	
	}

	initControlls(){
		this.closeButton = new CloseButton(this.pageId);
		this.closeButton.appendThisCharToPage();
		this.controlls = [this.closeButton];
	}

	addEventListeners(){
		this.closeButton.eventTarget.addEventListener(this.closeButton.onClick, this.closePage.bind(this), false);
	}

	closePage(){		
		super.deletePage();
	}
}