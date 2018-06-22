//this page shows the correlations of different crimetypes
//by appending a CrimeCorrelation-chart to the page
//it has no controlls
class CrimeCorrelationPage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = new CrimeCorrelation();
		this.ColorLegendTitle = "Correlation between Crime Types";
		this.ColorLegendStartLabel = "No Correlation";
		this.ColorLegendEndLabel = "High Correlation";
		this.startColor = configNamespace.CRIME_CORRELATION.lowCorrelationColor;
		this.endColor = configNamespace.CRIME_CORRELATION.highCorrelationColor;
	}

	init(){
		this.mainChart = new CrimeCorrelation(this.pageId);
		this.colorLegend = new ColorLegend(this.pageId, this.ColorLegendTitle, this.ColorLegendStartLabel, this.ColorLegendEndLabel, this.startColor, this.endColor);
		this.charts = [this.mainChart, this.colorLegend];
		this.mainChart.appendThisCharToPage();	
		this.colorLegend.appendThisCharToPage();	
	}
}