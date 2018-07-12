//The StartPage
//extends the TextPage
//to show the text of the StartPage
//which is set in the constructor

class StartPage extends TextPage{
	constructor(pageId = "mainpage", startText = ""){
		super(pageId, htmlelementsNamespace.startPage, htmlelementsNamespace.startPage.infoTextId, startText);
	}
}