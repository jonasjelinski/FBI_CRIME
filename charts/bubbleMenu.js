class BubbleMenu extends MagicCircle{
	constructor(pageId, categories, id){
		this.pageId = pageId;
		this.htmlelement = htmlelementsNamespace.MAGIC_CIRCLE;
		this.htmlElementID = this.htmlelement.htmlid + " "+id;
		this.htmlclassname = this.htmlelement.htmlclassname;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.categories = categories;
		this.unselectedColor = unselectedColor;
	}

	doChart(){
		drawBubbleMenu();
	}

	drawBubbleMenu(){
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
				.selectAll("cirle")
				.data(that.categories)
				.append("circle")
				.attr("class","bubble")
				.attr("width", that.width)
				.attr("height", that.height)
				.on("click", handleBubbleClick);				
		}

		function handleBubbleClick() {
			let bubble = d3.select(this);
			changeColor(bubble);
		}

		function changeColor(bubble) {
			let currentColor = bubble.style("fill");
			if(currentColor === that.unselectedColor){
				bubble.style("fill") = getColor(d);
			}
			else{
				bubble.style("fill") = that.unselectedColor;
			}
		}

		//returns color according to crimeType
		function getColor(d){
			let crime = d.key;
			return commonfunctionsNamespace.getCrimeColor(crime);
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