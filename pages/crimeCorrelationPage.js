class CrimeCorrelationPage extends ParentPage{
	constructor(pageId){
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