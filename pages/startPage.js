class StartPage extends ParentPage{
	constructor(pageId = "mainpage"){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.startPage;
		this.htmlElementID = this.htmlelement.htmlid;
	}

	init(){
		
	}
}