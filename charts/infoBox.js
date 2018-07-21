//This class
//creates an InfoxBox
//the InfoBox shows the parameter infoText as a "text"

class InfoBox extends MagicCircle{
	constructor(pageId, infoText){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.infoBox; 
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
		let textBox,
			container = this.container,
			that =this;

		initTextBox();	

		//appends a new element to container 
		//and gives it the data textArray
		function initTextBox(){					
			textBox = container.append(that.htmlElementType)
				.attr("class","textBox")
				.attr("width", that.width)
				.attr("height", that.height) 			
				.html(that.infoText)	                  		
		}				
	}	
}