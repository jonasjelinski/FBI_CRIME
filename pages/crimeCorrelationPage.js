class CrimeCorrelationPage extends ParentPage{
	constructor(){
		super();		
		this.mainChart = new CrimeCorrelation();
	}

	init(){
		this.mainChart = new CrimeCorrelation(this.pageId);
		this.charts = [this.mainChart];
		this.mainChart.appendThisCharToPage();
		this.charts = [this.mainChart]
	}
}