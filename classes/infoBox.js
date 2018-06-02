class InfoBox extends MagicCircle{

	constructor(){
		super();
		this.htmlelement = htmlel_namespace.INFO_BOX; 
		this.htmlElementID = this.htmlelement.rootid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.rootElement = this.getRootElement();
		this.htmlElementType = this.htmlelement.type; 
	}

	doChart(){
		let text = this.getTextData();
		this.drawInfoBox(text);
	}

	getTextData(){
		return "das lama mag keine gurken";
	}

	drawInfoBox(text){		
		let root, 
			textBox,
			textLabels,
			textArray = [text],
			that =this;
		prepareRoot();
		prepareTextBox();	
		appendText();

		function prepareRoot(){			
			root = that.rootElement.attr("class","InfoBox").attr("width", that.width).attr("height", that.height);
		}

		function prepareTextBox(){					
			textBox = root.append(that.htmlElementType)
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