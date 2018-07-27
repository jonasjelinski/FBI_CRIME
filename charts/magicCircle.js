/*---MAGIC CIRCLE--*/

//This class is the
//parentclass of all other classes
//this class is only used to act as a parentclass
//it receives the pageId as a parameter
//with this pageId it gets the page-DOM-Element 
//and appends a container to it
//in this container all other d3-graphics are drawn for this class
//all functions and class-variables are for the child-classes
 
class MagicCircle{
	constructor (pageId = "mainpage"){
		this.pageId = pageId; 
		this.page = this.getPage(); 
		this.data = this.getData();
		this.htmlelement = htmlelementsNamespace.magicCircle;
		this.htmlElementID = this.htmlelement.htmlid;
		this.htmlclassname = this.htmlelement.htmlclassname;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.getRootElement = this.getRootElement.bind(this);      
		this.container = {};
		this.eventTarget = new EventTarget();
		this.onBuilded = "onBuilded";		
	}
	
	//returns a rootElement where charts are appended	
	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);
	}

	//returns the page-DOM-Element
	getPage(){
		return commonfunctionsNamespace.getPageById(this.pageId);      
	}	
	
	//appends a container to the page
	//all charts are drawn into this container
	//standard function which is used by all instances of the childclass
	appendThisCharToPage(){
		this.container = this.page.append(this.htmlElementType)
			.attr("width", this.width)
			.attr("width", this.width)
			.attr("height",this.height)
			.attr("id", this.htmlElementID);		
	}
	
	//returns the data which is used to draw the charts
	getData(){
		return configNamespace.JSON_OBJECT;  
	}

	//creates the chart
	//standard function which is used by all instances of the childclass
	doChart(){
		this.drawCircle();   
	}

	//draws a small circle into the container
	//example function for the parent class
	//to understand it's structure	
	drawCircle(){
		let xpos=30, 
			ypos=20,
			durationTime = 2000,
			radius = 20,
			container =this.container,
			circle;

		initCircle();
			
		function initCircle(){
			circle = container
				.append("circle")
				.attr("cx", xpos)
				.attr("cy", ypos)
				.attr("r",radius)
				.transition().duration(durationTime);
		}		
	}

	//all elements which are drawn into the container a removed
	//and then created and drawn again
	updatesHimself(){
		this.killsHimself();
		this.doChart();	
	}

	//all elements which are drawn into the container a removed
	killsHimself(){
		this.container.selectAll("*").remove();
	}

	dispatchChartBuildedEvent(){
		let event = new Event(this.onBuilded);
		this.eventTarget.dispatchEvent(event);
	}
}