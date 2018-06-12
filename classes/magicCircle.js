class MagicCircle{
	constructor (pageId){
		this.pageId = "mainpage"; 
		this.page = this.getPage(); 
		this.data = this.getData();
		this.htmlelement = htmlelementsNamespace.MAGIC_CIRCLE;
		this.htmlElementID = this.htmlelement.htmlid;
		this.htmlclassname = this.htmlelement.htmlclassname;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.getRootElement = this.getRootElement.bind(this);      
		this.container = {};		
	}
	
	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);
	}

	getPage(){
		return commonfunctionsNamespace.getPageById(this.pageId);      
	}	
	
	appendThisCharToPage(){
		console.log("appned", this.htmlElementID);
		this.container = this.page.append(this.htmlElementType)
			.attr("width", this.width)
			.attr("width", this.width)
			.attr("height",this.height)
			.attr("id", this.htmlElementID);		
	}
	
	getData(){
		return configNamespace.JSON_OBJECT;  
	}

	doChart(){
		console.log("ein magischerKreis erzeugt sich selbst", this.page);
		this.drawCircle();   
	}

	drawCircle(){
		let xpos=30, 
			ypos=20,
			durationTime = 2000,
			radius = 20,
			that = this,
			container =this.container,
			rootElement,
			circle;

		prepareRootElement();
		initCircle();

		function prepareRootElement(){
			rootElement = that.rootElement.append(that.htmlElementType).attr("width",that.width).attr("height",that.height);
		}

		function initCircle(){
			circle = container
				.append("circle")
				.attr("cx", xpos)
				.attr("cy", ypos)
				.attr("r",radius)
				.transition().duration(durationTime);
		}		
	}

	updatesHimself(){
		this.killsHimself();
		this.doChart();	
	}

	killsHimself(){
		this.container.selectAll("*").remove();
	}
}