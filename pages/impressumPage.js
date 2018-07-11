class ImpressumPage extends TextPage{
	constructor(pageId, impressumText){
		super(pageId, htmlelementsNamespace.impressumPage, htmlelementsNamespace.impressumPage.infoTextId, impressumText);
	}
}