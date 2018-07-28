/*---PAGE: LINE CHART--*/

//this page shows two lineCharts an their controlls
//it inits two HalfLineChartPages which are both Pages extending the ParentPage
//a HalfLineChartPage consists of a Linchart, a BubbleMenu and a DropDownMenu
//for detailed informations look in the class HalfLineChartPage

class LineChartPage extends ParentPage{
	constructor(pageId){
		super(pageId);
		this.pageId = pageId;		
		this.htmlElement = htmlelementsNamespace.lineChartPage;
		this.firstContainerId = this.htmlElement.firstContainerId;
		this.secondContainerId = this.htmlElement.secondContainerId;
		this.containerType = this.htmlElement.containerType;
		this.containerWidth = this.htmlElement.containerWidth;
		this.containerHeight = this.htmlElement.containerHeight;
		this.firstDropDownIdStates = this.htmlElement.firstDropDownIdStates;
		this.firstBubbleMenuId = this.htmlElement.firstBubbleMenuId;
		this.secondDropDownIdStates = this.htmlElement.secondDropDownIdStates;
		this.secondBubbleMenuId = this.htmlElement.secondBubbleMenuId;
		this.firstLineChartId = this.htmlElement.firstLineChartId;
		this.secondLineChartId = this.htmlElement.secondLineChartId;
	}

	//creates the two halfs of the page an inits them
	init(){
		this.initContainers();
		this.initPageHalfs();
	}

	initContainers(){
		this.firstHalfContainer =this.createContainer(this.firstContainerId);
		this.secondHalfContainer = this.createContainer(this.secondContainerId); 
	}

	initPageHalfs(){
		this.firstHalf = new HalfLineChartPage(this.firstContainerId, this.firstLineChartId , this.firstDropDownIdStates, this.firstBubbleMenuId);
		this.secondHalf = new HalfLineChartPage(this.secondContainerId, this.secondLineChartId , this.secondDropDownIdStates, this.secondBubbleMenuId);
		this.firstHalf.init();
		this.secondHalf.init();
	}

	drawPage(){
		this.firstHalf.drawPage();
		this.secondHalf.drawPage();	
	}

	createContainer(id){
		return  this.page.append(this.containerType).attr("id", id).attr("width", this.containerWidth).attr("height", this.containerHeight); 
	}
}	