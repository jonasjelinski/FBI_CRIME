//this page shows an infoText
//by appending a InfoBox-chart to the page
//it has a CloseButton as controll which deletes this page

class InfoPage extends ParentPage{
	constructor(pageId = "infopage", infoText = "Das Pferd mag keine Gurken"){
		super(pageId);
		this.pageId = pageId;
		this.htmlelement = htmlelementsNamespace.infoPage;
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