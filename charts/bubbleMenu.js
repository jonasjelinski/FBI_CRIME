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
		this.unselectedColor = this.htmlelement.unselectedColor
		this.eventTarget = new EventTarget();
		this.fontSize = this.htmlelement.fontSize;
	}

	doChart(){
		this.drawBubbleMenu();
	}

	drawBubbleMenu(){
		let bubbles,
			labels, 
			container = this.container,
			that = this,
			diameter = this.width/ this.categories.length,
			radius = diameter/2,
			x = this.width/2,
			yStart = radius,
			max = 10,
			random =Math.floor((Math.random() * max) + 1),
			selectId = this.categories[0]+random,
			fontSize = this.fontSize;

		initBubbles();
		initLabels();
		setEnterAndExitBehaviour();			

		//appends a rect to container 
		function initBubbles(){
			bubbles = container
				.selectAll("bubbles")
				.append("svg")
				.attr("class", "bubbles")
				.data(that.categories);							
		}

		
		//inits labels and sets width and height and position of allGraphLines
		function initLabels(){
			labels = container   
				.selectAll("labels")         
				.append("svg")
				.attr("width", that.width)
				.attr("height", that.label)
				.attr("class", "labels")
				.data(that.categories);
		}

		function setEnterAndExitBehaviour(){
			enterBubble();
			enterLabel();
			bubbles.exit().remove();
			labels.exit().remove();
		}

		function enterBubble(){
			bubbles.enter().append("circle")
				.attr("class","bubble")
				.attr("crimeType", function(d){
					return d;
				})
				.attr("cx", x)
				.attr("cy", function(d,i){
					return calculateYPos(i);
				})
				.attr("r", radius)
				.style("fill", getColor)
				.on("click", handleBubbleClick);
		}

		//gives data to labels and draws new labels with new data on enter
		function enterLabel(){			
			labels.enter()
				.append("g")
				.attr("class", "label")
				.attr("crimeType", function(d){
					return d;
				})
				.append("text")
				.attr("crimeType", function(d){
					return d;
				})
				.attr("x", x + diameter)
				.attr("y", function(d,i){return calculateYPos(i);})           
				.attr("font-size", fontSize)
				.style("fill", function(d){return getColor(d)})
				.text(function(d) { return d; });
		}

		function calculateYPos(i){
			return yStart+(diameter)*i;
		}

		function handleBubbleClick() {
			let bubble = d3.select(this),
				crime = bubble.attr("crimeType"),
				label = getLabelByCrimeType(crime);
			changeColor(bubble);
			changeColor(label)
			sendSelectedValue(crime);
		}

		function getLabelByCrimeType(crime){
			let selector = "g[crimeType='"+crime+"']",
					label = d3.selectAll(selector).filter(".label").select("text");
			return label;
		}

		function changeColor(bubble) {
			let currentColor = bubble.style("fill");
			if(currentColor === that.unselectedColor){
				let crime = bubble.attr("crimeType");
					bubble.style("fill", function(){
						return getColor(crime);
					});					
			}
			else{
				
				bubble.style("fill", that.unselectedColor);
			}
		}

		//returns color according to crimeType
		function getColor(d){
			let crime = d;
			return commonfunctionsNamespace.getCrimeColor(crime);
		}  

		
		//sends an event which contains the value of the selected select
		function sendSelectedValue(value){		
			sendEvent(value);			
		}	

		//dispatches a new CustomEvent containing value as value of property selection
		function sendEvent(value){
			let event = new CustomEvent(that.selectionEvent, {detail: {selection : value}});							
			that.eventTarget.dispatchEvent(event);
		}
	}
	

}