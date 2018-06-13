class InfoBox extends MagicCircle{

	constructor(pageId, infoText){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.INFO_BOX; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.page = this.getRootElement();
		this.htmlElementType = this.htmlelement.type;
		this.infoText = infoText; 
	}

	doChart(){		
		this.drawInfoBox();
	}

	drawInfoBox(){		
		let root, 
			textBox,
			textLabels,
			container = this.container,
			textArray = [this.infoText],
			that =this;

		prepareTextBox();	
		appendText();

		function prepareTextBox(){					
			textBox = container.append(that.htmlElementType)
				.attr("class","textBox")
				.attr("width", that.width)
				.attr("height", that.height) 			
				.data(textArray)	            
				.append("text");	                  		
		}		
			
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