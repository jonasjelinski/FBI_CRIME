//This class
//appends and html-text to the container
//the text is set in the constructor
//the visibility of the text can be changed
class InfoText extends MagicCircle{
	constructor(pageId, chartId, text){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.infoText;
		this.htmlElementID = this.htmlelement.htmlid + chartId;
		this.htmlElementType = this.htmlelement.type;
		this.text = text;
		this.isHidden = true;
	}

	doChart(){
		this.drawInfoText();
	}

	setInfoText(text){
		this.text = text;
	}

	drawInfoText(){
		this.container.html(this.text);
	}

	hideInfoText(){
		let opacity = 0;
		this.isHidden = true;
		this.container.style("opacity", opacity);
	}

	showInfoText(){
		let opacity = 1;
		this.isHidden = false;
		this.container.style("opacity", opacity);
	}

	switchVisibility(){
		if(! this.isHidden){
			this.hideInfoText();
		}
		else{
			this.showInfoText();
		}
	}

}