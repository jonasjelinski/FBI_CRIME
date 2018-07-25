/*---PAGE: DATA REGULATION--*/

//The DataRegulationPage
//extends the TextPage
//to show the DataRegulations
//which are set in the constructor

class DataRegulationPage extends TextPage{
	constructor(pageId = "mainpage", regulationText = ""){
		super(pageId, htmlelementsNamespace.dataRegulationPage, htmlelementsNamespace.dataRegulationPage.infoTextId, regulationText);
	}
}