/*---PAGE: CRIME CORRELATION--*/

//this page shows the correlations of different crimetypes
//by appending a CrimeCorrelation-chart to the page
//it has no controlls
//two colorLegends explain how the correlation is presented in colors
//one legend explains the colo-sheme of the positive correlation
//one legend explains the colo-sheme of the negative correlation
class CrimeCorrelationPage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = new CrimeCorrelation();
		this.htmlElement = htmlelementsNamespace.crimeCorrelationPage;
		this.positiveColorLegendTitle = this.htmlElement.positiveColorLegendTitle;
		this.negativeColorLegendTitle = this.htmlElement.negativeColorLegendTitle;
		this.colorLegendStartLabel = this.htmlElement.colorLegendStartLabel;
		this.colorLegendEndLabel = this.htmlElement.colorLegendEndLabel;
		this.positiveStartColor = this.htmlElement.positiveStartColor;
		this.negativeEndColor = this.htmlElement.negativeEndColor;
		this.negativeStartColor = this.htmlElement.negativeStartColor; 
		this.negativeEndColor = this.htmlElement.negativeEndColor;
		this.positivecColorLegendId = "CorrelationsPositive";
		this.negativeColorLegendId = "CorrelationsNegative";
		this.positiveMin = 0;
		this.positiveMax = 1;
		this.negativeMin = 0;
		this.negativeMax = -1;
		this.colorLegendValueDescription = this.htmlElement.colorLegendValueDescription;
	}

	init(){
		this.mainChart = new CrimeCorrelation(this.pageId);
		this.positiveCorrelationColorLegend = new ColorLegend(this.positivecColorLegendId, this.pageId, this.positiveColorLegendTitle, 
				this.colorLegendStartLabel, this.colorLegendEndLabel, this.positiveStartColor, this.positiveEndColor,
				this.colorLegendValueDescription, this.positiveMin, this.positiveMax);

		this.negativeCorrelationColorLegend = new ColorLegend(this.negativeColorLegendId, this.pageId, this.negativeColorLegendTitle, 
			this.colorLegendStartLabel, this.colorLegendEndLabel, this.negativeStartColor, this.negativeEndColor,
			this.colorLegendValueDescription, this.negativeMin, this.negativeMax);

		this.charts = [this.mainChart, this.positiveCorrelationColorLegend, this.negativeCorrelationColorLegend];
		this.mainChart.appendThisCharToPage();	
		this.positiveCorrelationColorLegend.appendThisCharToPage();	
		this.negativeCorrelationColorLegend.appendThisCharToPage();	
	}
}