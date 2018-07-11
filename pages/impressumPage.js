//The ImpressumPage
//extends the TextPage
//to show the Impressum
//which is set in the constructor

class ImpressumPage extends TextPage{
	constructor(pageId, impressumText){
		super(pageId, htmlelementsNamespace.impressumPage, htmlelementsNamespace.impressumPage.infoTextId, impressumText);
	}
}