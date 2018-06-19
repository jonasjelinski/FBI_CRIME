//this page shows the correlations of different crimetypes
//by appending a CrimeCorrelation-chart to the page
//it has no controlls
class CrimeCorrelationPage extends ParentPage{
	constructor(pageId){
		super(pageId);		
		this.mainChart = new CrimeCorrelation();
	}

	init(){
		this.mainChart = new CrimeCorrelation(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart]
	}
}