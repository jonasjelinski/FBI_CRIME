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