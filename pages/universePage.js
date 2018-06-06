class UniversePage extends ParentPage{
	constructor(){
		super();
		this.rootElement = this.mainChart.rootElement;
		this.mainChart = new Universe();
		this.mainControll = new TimeLine();		
	}

}