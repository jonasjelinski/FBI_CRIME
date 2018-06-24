//This page is the parentPage for all other pages
//it contains nearly all functions the child-pages need

class ParentPage{
	constructor(pageId = "mainpage"){
		this.pageId = pageId;
		this.htmlElementID = htmlelementsNamespace.UNIVERSE_PAGE.htmlid;			
		this.mainChart = {};
		this.width = htmlelementsNamespace.PARENT_PAGE.width;
		this.height = htmlelementsNamespace.PARENT_PAGE.height;
		this.charts = [];
		this.controlls = [];
		this.page = commonfunctionsNamespace.getPageById(this.pageId);
	}

	//inits the page
	//adds a new chart to the array charts
	init(){
		this.mainChart = new Universe(pageId);
		this.charts = [this.mainChart];	
	}

	//draws the page
	drawPage(){
		this.showPage();
		this.drawAllCharts();
		this.drawAllControlls();		
	}
	
	//creates and draws all charts in array charts
	drawAllCharts(){
		for(let i = 0; i < this.charts.length; i++ ){
			let chart = this.charts[i];
			if(!this.isNoChart(chart)){
				chart.doChart();
			}			
		}
	}

	//checks if chart is null or undefined
	isNoChart(chart){
		if(this.isNullOrUndefined(chart)){
			return true;
		}		
		return false;	
	}

	isNullOrUndefined(element){
		if(element === undefined || element === null){
			return true;
		}		
		return false;
	}

	//creates and draws all charts in array controlls
	drawAllControlls(){
		for(let i = 0; i < this.controlls.length; i++ ){
			let controll = this.controlls[i];
			if(!this.isNoChart(controll)){
				controll.doChart();
			}			
		}
	}

	//deletes the page and draws it again
	updatePage(){
		this.deletePage();
		this.drawPage();
	}	

	//removes all elements appended to this.page
	//and hides it
	deletePage(){
		d3.select("#map").style("pointer-events", "visible");
		this.page.selectAll("*").remove();
		this.hidePage();
	}

	//hides page by changing the style attribute visiblity
	hidePage(){
		this.page.style("visibility","hidden");
	}

	//shows page by changing the style attribute visiblity
	showPage(){
		this.page.style("visibility","visible");
	}
	
}