//this page shows the correlations of different crimetypes
//by appending a CrimeCorrelation-chart to the page
//it has no controlls
class CrimeCorrelationPage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = new CrimeCorrelation();
		this.htmlElement = htmlelementsNamespace.CRIME_CORRELATION_PAGE;
		this.ColorLegendTitle = this.htmlElement.colorLegendTitle;
		this.ColorLegendStartLabel = this.htmlElement.colorLegendStartLabel;
		this.ColorLegendEndLabel = this.htmlElement.colorLegendEndLabel;
		this.startColor = this.htmlElement.startColor;
		this.endColor = this.htmlElement.endColor;
	}

	init(){
		this.mainChart = new CrimeCorrelation(this.pageId);
		this.colorLegend = new ColorLegend(this.pageId, this.ColorLegendTitle, this.ColorLegendStartLabel, this.ColorLegendEndLabel, this.startColor, this.endColor);
		this.charts = [this.mainChart, this.colorLegend];
		this.mainChart.appendThisCharToPage();	
		this.colorLegend.appendThisCharToPage();	
	}
}