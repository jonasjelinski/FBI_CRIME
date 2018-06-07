class DropDownMenu{
	constructor(rootElement, dropDownArray) {
		this.htmlid = "universePage"; 		
		this.page = rootElement;		
		this.selectedValue = dropDownArray[0];
		this.dropDownArray = dropDownArray;
		this.width = 100;
		this.height = 100; 
	}

	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);      
	}

	doChart(){		
		this.createDropDownMenu();
	}

	//source: http://bl.ocks.org/jfreels/6734823
	createDropDownMenu(){
		let dropDownMenu, 
			menu,
			dropDownOptions,
			that = this;

		function initDropDownMenu(){
			dropDownMenu = that.rootElement
				.append("rect")
				.attr("class","dropDownMenu")
				.attr("width", that.width)
				.attr("height", that.height)
				
		}

		function initMenu(){
			menu = dropDownMenu
				.append("select")
				.attr("class","menu")
				.attr("width", that.width)
				.attr("height", that.height)
				.on("change", setSelectedValue);			
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

		function setSelectedValue(d){			
			that.selectValue = d3.select("select").property("value");
		}		

		initDropDownMenu();
		initMenu();
		initDropDownOptions();
		
	}

	getSelectedValue(){
		return this.selectedValue;
	}

}