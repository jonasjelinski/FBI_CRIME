//creates a simple button
//which contains of a filled circle
//and a simple cross

class CloseButton extends MagicCircle{
	constructor(pageId){
		super(pageId);		
		this.htmlelement = htmlelementsNamespace.CLOSE_BUTTON; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.strokeColor = this.htmlelement.strokeColor;
		this.fillColor = this.htmlelement.fillColor;
		this.strokeWidth = this.htmlelement.strokeWidth;
		this.strokeColor = this.htmlelement.strokeColor;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.onClick = "onClick";
		this.eventTarget =  new EventTarget();
	}

	doChart(){
		this.drawCloseButton();
	}

	//source: https://bl.ocks.org/Lulkafe/95a63ddea80d4d02cc4ab8bedd48dfd8
	//draws this button
	drawCloseButton(){		
		let container = this.container,
			radius = this.width/2,
			offset = radius/3,
			x = this.width/2,
			y = this.height/2,
			that = this,
			data = ["defaultValue"];//needed to d3 will create a chart

		initCircle();		
		initCross();			
		rotateButton();
		addOnClickEvent();

		//draws a circle
		function initCircle(){
			container
				.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("class", "buttoncircle")
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", radius)
				.style("stroke-width", that.strokeWidth)
				.style("fill", that.fillColor);
		}

		//drasw a cross
		function initCross(){
			container
				.selectAll("line.buttonLine1")						
				.data(data)
				.enter()
				.append("line")		
				.attr("class", "buttonLine1")
				.attr("x1", x - radius)
				.attr("y1", y)
				.attr("x2", x + radius)
				.attr("y2", y)
				.attr("stroke-width", that.strokeWidth)
				.attr("stroke", that.strokeColor);

			container
				.selectAll("line.buttonLine2")
				.data(data)				
				.enter()
				.append("line")					
				.attr("class", "buttonLine2")
				.attr("x1", x)
				.attr("y1", y - radius)
				.attr("x2", x)
				.attr("y2", y + radius)
				.style("stroke-width", that.strokeWidth)
				.style("stroke", that.strokeColor);
		}

		//rotatates so the button looks like an close-x-button, instead of  an append-+-button
		function rotateButton(){
			container.attr("transform", "rotate (45," + x + "," + y + ")");
		}

		//determines clickEvent of the container
		function addOnClickEvent(){
			container.on("click", sendOnClickEvent);
		}

		//dispatches the event of the type that.onClick
		function sendOnClickEvent(){			
			let event = new Event(that.onClick);							
			that.eventTarget.dispatchEvent(event);
		}

	}

}