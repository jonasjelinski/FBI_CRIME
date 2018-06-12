class InfoPage extends ParentPage{
	constructor(pageId = "infopage", infoText = "Das Pferd mag keine Gurken"){
		super(pageId);
		this.pageId = pageId;
		this.htmlelement = htmlelementsNamespace.INFO_PAGE;
		this.htmlElementID = this.htmlelement.htmlid;
		this.infoText = infoText;		
	}

	init(){
		this.initCharts();
		this.initControlls();
		this.addEventListeners();		
	}

	initCharts(){
		this.mainChart = new InfoBox(this.pageId, this.infoText);
		this.mainChart.appendThisCharToPage();		
		this.charts = [this.mainChart];	
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