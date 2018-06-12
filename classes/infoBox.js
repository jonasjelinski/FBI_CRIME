class InfoBox extends MagicCircle{

	constructor(pageId){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.INFO_BOX; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.page = this.getRootElement();
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
		prepareRootElement();
		prepareTextBox();	
		appendText();

		function prepareRootElement(){			
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