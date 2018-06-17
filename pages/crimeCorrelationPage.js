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