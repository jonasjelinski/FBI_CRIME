class InfoText extends MagicCircke{
	constructor(pageId, chartId, text){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.InfoText;
		this.htmlElementID = this.htmlelement.htmlid + chartId;
		this.text = text;
	}

	doChart(){
		drawInfoText();
	}

	drawInfoText(){
		this.container.appendHTML(this.text);
	}
}