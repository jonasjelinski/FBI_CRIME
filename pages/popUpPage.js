//this page shows an poup
//containing a Sunburst and a Tree
//to show the details of the crimerate of a specific state during a specific year
//it has a CloseButton and a bubbleMenu as controlls
//with the closeButton the user can close this page
//with the BubbleMenu the user can show details of the Sunburst
//to close the page

class PopUpPage extends ParentPage{
	constructor(pageId = "popup", state = configNamespace.STATES_AND_CRIMES.states[0], year = 2000){
		super(pageId);
		this.pageId = pageId;
		this.htmlelement = htmlelementsNamespace.popupPage;
		this.htmlElementID = this.htmlelement.htmlid;
		this.state = state;
		this.year = year;
		this.eventTarget =new EventTarget();
		this.bubbleMenuId = "PopUp";
		this.closeButtonId = "PopUp";
		this.dropDownId = "PopUp";
	}

	init(){
		this.initHeader();
		this.initCharts();
		this.initControlls();
		this.addEventListeners();
	}

	initHeader(){
		this.header = this.page.append("h1").attr("class","stateInfo").attr("id","stateInfoPopUpId").text("State: "+this.state+ "  Year :"+ this.year);
	}

	initCharts(){
		this.initSuburst();
		this.initTree();		
		this.charts = [this.mainChart, this.treeChart];
	}

	initSuburst(){
		this.mainChart = new Sunburst(this.pageId, this.state, this.year);
		this.mainChart.appendThisCharToPage();
	}

	initTree(){
		this.treeChart = new Tree(this.pageId, this.state, this.year);
		this.treeChart.appendThisCharToPage();
	}

	initControlls(){
		this.initCoseButton();
		this.initBubbleMenu();
		this.initDropDownMenu();
		this.controlls = [this.closeButton, this.bubbleMenu, this.dropDownMenu];
	}

	initCoseButton(){
		this.closeButton = new CloseButton(this.pageId, this.closeButtonId);
		this.closeButton.appendThisCharToPage();
	}

	initBubbleMenu(){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes(),
			categories = ["violentCrime", "propertyCrime"],
			selections = crimeTypes.concat(categories);
		this.bubbleMenu = new BubbleMenu(this.pageId,selections, this.bubbleMenuId);
		this.bubbleMenu.appendThisCharToPage();
	}

	initDropDownMenu(){
		let years = commonfunctionsNamespace.getAllYears;
		this.dropDownMenu = new DropDownMenu(this.pageId, years, this.dropDownId);
		this.dropDownMenu.appendThisCharToPage();
	}

	addEventListeners(){
		this.closeButton.eventTarget.addEventListener(this.closeButton.onClick, this.closePage.bind(this), false);
		this.bubbleMenu.eventTarget.addEventListener(this.bubbleMenu.selectionEvent, this.updateChartCrimeType.bind(this), false);
		this.dropDownMenu.eventTarget.addEventListener(this.dropDownMenu.selectionEvent, this.updateYear.bind(this), false);
	}

	closePage(){
		this.dispatchCloseEvent();
		super.deletePage();
	}

	updateChartCrimeType(event){
		let crimeType = event.detail.selection;
		this.mainChart.showOrHideLinesAndLabels(crimeType);
	}

	dispatchCloseEvent(){
		let event = new Event("closeButton");
		this.eventTarget.dispatchEvent(event);
	}

	updateYear(event){
		let year = event.detail.selection;
		this.year = year;
		this.updateHeader();
		this.mainChart.setYear(year);
		this.treeChart.setYear(year);
		this.mainChart.updatesHimself();
		this.treeChart.updatesHimself();
		this.resetBubbleMenu();

	}

	updateHeader(){
		this.header.text("");
		this.initHeader();
	}

	resetBubbleMenu(){
		this.bubbleMenu.updatesHimself();
	}
}
