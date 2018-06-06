class MagicCircle{
	constructor (){
		this.data = this.getData();
		this.htmlelement = htmlelementsNamespace.MAGIC_CIRCLE;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;               
		this.htmlElementID = this.htmlelement.rootid;
		this.htmlElementType = this.htmlelement.type;
		this.rootElement = this.getRootElement(); 
		this.getRootElement = this.getRootElement.bind(this);
	}
	
	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);      
	}
	
	getData(){
		return configNamespace.JSON_OBJECT;  
	}

	doChart(){
		console.log("ein magischerKreis erzeugt sich selbst", this.rootElement);
		this.drawCircle();   
	}

	drawCircle(){
		let xpos=30, 
			ypos=20,
			durationTime = 2000,
			radius = 20,
			that = this,
			rootElement,
			circle;

		prepareRootElement();
		initCircle();

		function prepareRootElement(){
			rootElement = that.rootElement.append(that.htmlElementType).attr("width",that.width).attr("height",that.height);
		}

		function initCircle(){
			circle = rootElement.append(that.htmlElementType)
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
		this.rootElement.selectAll("*").remove();
	}
}