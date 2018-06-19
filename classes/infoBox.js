//creates an InfoxBox
//the InfoBox shows the parameter infoText as a "text"

class InfoBox extends MagicCircle{
	constructor(pageId, infoText){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.INFO_BOX; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.htmlElementType = this.htmlelement.type;
		this.infoText = infoText; 
	}

	doChart(){		
		this.drawInfoBox();
	}

	//draws the InfoxBox
	drawInfoBox(){		
		let root, 
			textBox,
			textLabels,
			container = this.container,
			textArray = [this.infoText],
			that =this;

		initTextBox();	
		appendText();

		//appends a new element to container 
		//and gives it the data textArray
		function initTextBox(){					
			textBox = container.append(that.htmlElementType)
				.attr("class","textBox")
				.attr("width", that.width)
				.attr("height", that.height) 			
				.data(textArray)	            
				.append("text");	                  		
		}		
		
		//appends the text of infoText as text-element	
		function appendText(){
			textLabels = textBox
				.attr("x", that.width/2)
				.attr("y", that.width/2)
				.text( function (d) {				
					return d;})
				.attr("font-family", "sans-serif")
				.attr("font-size", "20px")
				.attr("fill", "black");                       
		}
	}	
}