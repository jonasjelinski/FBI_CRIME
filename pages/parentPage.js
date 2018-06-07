class ParentPage{
	constructor(pageId){
		this.pageId = "mainpage";
		this.htmlElementID = htmlelementsNamespace.UNIVERSE_PAGE.htmlid;			
		this.mainChart = {};
		//this.mainControll = new DropDownMenu();
		this.width = htmlelementsNamespace.PARENT_PAGE.width;
		this.height = htmlelementsNamespace.PARENT_PAGE.height;
		this.charts = [];
		this.controlls = [this.mainControll];
	}

	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);      
	}

	init(){
		console.log("a");
		this.mainChart = new Universe(pageId);
		this.charts = [this.mainChart];	
	}

	drawPage(){
		console.log("drawPage", this.charts.length);
		this.drawAllCharts();
		this.drawAllControlls();		
	}
	
	drawAllCharts(){
		for(let i = 0; i < this.charts.length; i++ ){
			console.log("drawPage 2");
			let chart = this.charts[i];
			if(!this.isNoChart(chart)){
				console.log("drawPage 3");
				chart.doChart();
			}			
		}
	}

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

	drawAllControlls(){
		for(let i = 0; i < this.controlls.length; i++ ){
			let controll = this.controlls[i];
			if(!this.isNoControll(controll)){
				controll.doChart();
			}			
		}
	}

	isNoControll(controll){
		if(this.isNullOrUndefined(controll)){
			return true;
		}		
		return false;			
	}

	updatePage(){
		this.deletePage();
		this.drawPage();
	}	

	deletePage(){
		this.deleteAllElements();		
	}

	deleteAllElements(){
		this.deleteAllCharts();
		this.deleteAllControlls();
	}

	deleteAllCharts(){
		for(let i = 0; i < this.charts.length; i++ ){
			let chart = this.charts[i];
			if(!this.isNoChart(chart)){
				chart.killsHimself();
			}			
		}
	}

	deleteAllControlls(){
		for(let i = 0; i < this.controlls.length; i++ ){
			let controll = this.controlls[i];
			if(!this.isNoControll(controll)){
				controll.killsHimself();
			}			
		}
	}

	hidePage(){

	}

	showPage(){

	}
	
}