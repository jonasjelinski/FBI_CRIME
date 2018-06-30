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
		let bubbles, 
			container = this.container,
			that = this,
			diameter = this.width/ this.categories.length,
			radius = diameter/2,
			x = this.width/2,
			yStart = radius,
			max = 10,
			random =Math.floor((Math.random() * max) + 1),
			selectId = this.categories[0]+random;

		initDropDownMenu();
		setEnterAndExitBehaviour();			

		//appends a rect to container 
		function initDropDownMenu(){
			bubbles = container
				.selectAll("circle")
				.data(that.categories);
							
		}

		function setEnterAndExitBehaviour(){
			bubbles.exit().remove();
			bubbles.enter().append("circle")
				.attr("class","bubble")
				.attr("cx", x)
				.attr("cy", function(d,i){
					return calculateYPos(i);
				})
				.attr("r", radius)
				.style("fill", getColor)
				.on("click", handleBubbleClick);
		}

		function calculateYPos(i){
			return yStart+(diameter)*i;
		}

		function handleBubbleClick() {
			console.log("click");
			let bubble = d3.select(this);
			changeColor(bubble);
		}

		function changeColor(bubble) {
			let currentColor = bubble.style("fill");
			if(currentColor === that.unselectedColor){
				//bubble.style("fill") = getColor(d);
			}
			else{
				console.log(currentColor);
				bubble.style()
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