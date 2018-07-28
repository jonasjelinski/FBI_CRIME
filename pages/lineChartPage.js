/*---PAGE: LINE CHART--*/

//this page shows two lineCharts an their controlls
//it inits two HalfLineChartPages which are both Pages extending the ParentPage
//a HalfLineChartPage consists of a Linchart, a BubbleMenu and a DropDownMenu
//for detailed informations look in the class HalfLineChartPage

class LineChartPage extends ParentPage{
	constructor(pageId){
		super(pageId);
		this.pageId = pageId;
		this.firstContainerId = "firstHalfLineChartPage";
		this.secondContainerId = "secondHalfLineChartPage";		
		this.htmlElement = htmlelementsNamespace.lineChartPage;
		this.firstDropDownIdStates = "firstLineChartHalf";
		this.firstBubbleMenuId = "firstLineChartHalf";
		this.secondDropDownIdStates = "secondLineChartHalf";
		this.secondBubbleMenuId = "secondLineChartHalf";
		this.firstLineChartId = "firstLineChart";
		this.secondLineChartId = "secondLineChart";
	}

	//creates the two halfs of the page an inits them
	init(){
		this.initContainers();
		this.initPageHalfs();
	}

	initContainers(){
		this.firstHalfContainer = this.page.append("div").attr("id", this.firstContainerId); 
		this.secondHalfContainer = this.page.append("div").attr("id", this.secondContainerId); 
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
}	