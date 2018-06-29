class BubbleMenu extends MagicCircle{
	constructor(pageId, categories, id){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.BUBBLE_MENU;
		this.htmlElementID = this.htmlelement.htmlid + " "+id;
		this.htmlclassname = this.htmlelement.htmlclassname;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.categories = categories;
		this.unselectedColor = this.htmlelement.unselectedColor;
	}

	doChart(){
		this.drawBubbleMenu();
	}

	drawBubbleMenu(){
		let dropDownMenu, 
			menu,
			container = this.container,
			dropDownOptions,
			that = this,
			max = 10,
			random =Math.floor((Math.random() * max) + 1),
			selectId = this.categories[0]+random;

		console.log(container);	
		initDropDownMenu();
		setEnterAndExitBehaviour();			

		//appends a rect to container 
		function initDropDownMenu(){
			dropDownMenu = container
				.selectAll("cirle")
				.data(that.categories);
							
		}

		function setEnterAndExitBehaviour(){
			dropDownMenu.exit().remove();
			dropDownMenu.enter().append("circle")
				.attr("class","bubble")
				.attr("width", that.width)
				.attr("height", that.height)
				.style("fill", getColor)
				.on("click", handleBubbleClick);
		}

		function handleBubbleClick() {
			let bubble = d3.select(this);
			changeColor(bubble);
		}

		function changeColor(bubble) {
			let currentColor = bubble.style("fill");
			if(currentColor === that.unselectedColor){
				//bubble.style("fill") = getColor(d);
			}
			else{
				//bubble.style("fill") = that.unselectedColor;
			}
		}

		//returns color according to crimeType
		function getColor(d){
			let crime = d;
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