//creates a dropdown menu 
//the dropDownArray contains the values which are shown as options in the menu

class DropDownMenu extends MagicCircle{
	constructor(pageId, dropDownArray, chartId) {
		super(pageId);
		this.htmlelement = htmlelementsNamespace.dropDown;
		this.htmlElementID = this.htmlelement.htmlid+chartId;
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

	//creates a dropdown-menu
	//which contains of a select and options
	//which are drawn into a rect
	//source: http://bl.ocks.org/jfreels/6734823
	createDropDownMenu(){
		let dropDownMenu, 
			menu,
			container = this.container,
			dropDownOptions,
			that = this,
			max = 10,
			random =Math.floor((Math.random() * max) + 1),
			selectId = this.dropDownArray[0]+random;

		initDropDownMenu();
		initMenu();
		initDropDownOptions();				

		//appends a rect to container 
		function initDropDownMenu(){
			dropDownMenu = container
				.append("rect")
				.attr("class","dropDownMenu")
				.attr("width", that.width)
				.attr("height", that.height);				
		}

		//appends a select to container
		//detemines the behaviour if something is selected
		//from the dropDownMenu 
		function initMenu(){
			menu = dropDownMenu
				.append("select")
				.attr("id", selectId)
				.attr("class","menu")
				.attr("width", that.width)
				.attr("height", that.height)
				.on("change", sendSelectedValue);			
		}

		//appends options to menu 
		//for each entry in the dropDownArray
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

		//sends an event which contains the value of the selected select
		function sendSelectedValue(){			
			let value = d3.select("#"+selectId).property("value");
			sendEvent(value);			
		}	

		//dispatches a new CustomEvent containing value as value of property selection
		function sendEvent(value){
			let event = new CustomEvent(that.selectionEvent, {detail: {selection : value}});							
			that.eventTarget.dispatchEvent(event);
		}
	}
}