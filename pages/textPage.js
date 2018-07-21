//This Page shows an InfoText
//the text is set in the constructor
class TextPage extends ParentPage{
	constructor(pageId, htmlid, infoTextId, text){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.impressumPage;
		this.htmlElementID = htmlid;
		this.text = text;
		this.infoTextId = infoTextId;	
	}

	init(){
		this.initCharts();		
	}

	initCharts(){
		this.mainChart = new InfoText(this.pageId, this.infoTextId, this.text);
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart];	
	}
}