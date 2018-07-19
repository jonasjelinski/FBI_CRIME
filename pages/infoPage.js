//this page shows an infoText
//by appending a InfoBox-chart to the page
//it has a CloseButton as controll which deletes this page

class InfoPage extends ParentPage{
	constructor(pageId = "infopage", infoText = "Das Pferd mag keine Gurken"){
		super(pageId);
		this.pageId = pageId;
		this.closeButtonId = "InfoPage";
		this.htmlelement = htmlelementsNamespace.infoPage;
		this.htmlElementID = this.htmlelement.htmlid;
		this.infoText = infoText;
		this.isVisible = true;
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
		this.closeButton = new CloseButton(this.pageId, this.closeButtonId);
		this.closeButton.appendThisCharToPage();
		this.controlls = [this.closeButton];
	}

	addEventListeners(){
		this.closeButton.eventTarget.addEventListener(this.closeButton.onClick, this.handleCloseClick.bind(this), false);
	}

	toggleVisibility(){	
		this.isVisible = !this.isVisible;				
	}

	handleCloseClick(){
		this.closePage();
		this.toggleVisibility();
	}

	closePage(){
		super.deletePage();
	}

	setInfoText(text){
		this.infoText = text;
	}
}
