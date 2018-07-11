class StartPage extends TextPage{
	constructor(pageId = "mainpage", startText = ""){
		super(pageId, htmlelementsNamespace.startPage, htmlelementsNamespace.startPage.infoTextId, startText);
	}
}