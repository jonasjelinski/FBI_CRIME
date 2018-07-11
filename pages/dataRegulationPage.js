class DataRegulationPage extends TextPage{
	constructor(pageId = "mainpage", regulationText = ""){
		super(pageId, htmlelementsNamespace.dataRegulationPage, htmlelementsNamespace.dataRegulationPage.infoTextId, regulationText);
	}
}