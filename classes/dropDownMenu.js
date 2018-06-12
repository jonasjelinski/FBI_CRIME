class DropDownMenu extends MagicCircle{
	constructor(dropDownArray) {
		super();
		this.htmlelement = htmlelementsNamespace.DROP_DOWN;
		this.htmlElementID = this.htmlelement.htmlid;
		this.htmlElementType = this.htmlelement.type;		
		this.selectedValue = dropDownArray[0];
		this.dropDownArray = dropDownArray;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.selectionEvent = "dropDownSelection";
		this.eventTarget =  new EventTarget();
	}	

	doChart(){		
		this.createDropDownMenu();
	}

	//source: http://bl.ocks.org/jfreels/6734823
	createDropDownMenu(){
		let dropDownMenu, 
			menu,
			container = this.container,
			dropDownOptions,
			that = this;

		initDropDownMenu();
		initMenu();
		initDropDownOptions();				

		function initDropDownMenu(){
			dropDownMenu = container
				.append("rect")
				.attr("class","dropDownMenu")
				.attr("width", that.width)
				.attr("height", that.height);				
		}

		function initMenu(){
			menu = dropDownMenu
				.append("select")
				.attr("class","menu")
				.attr("width", that.width)
				.attr("height", that.height)
				.on("change", sendSelectedValue);			
		}

		function initDropDownOptions(){	
			
			dropDownOptions = menu
				.selectAll("option")
				.data(that.dropDownArray)
				.enter()
				.append("option")
				.text(function(d){return d;})
				.attr("width", that.width)
				.attr("height", that.height);
		}

		function sendSelectedValue(d){			
			let value = d3.select("select").property("value");
			sendEvent(value);			
		}	

		function sendEvent(value){
			let event = new CustomEvent(that.selectionEvent, {detail: {selection : value}});							
			that.eventTarget.dispatchEvent(event);
		}
	}
}