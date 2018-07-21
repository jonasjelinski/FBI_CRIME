//This class
//creates a BubbleMenu
//each bubble shows a different category
//onClick on a a bubble its color changes to this.unselected color
//and an event with the value of the bubble atteched to it is dispatched

class BubbleMenu extends MagicCircle{
	constructor(pageId, categories, chartId){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.bubbleMenu;
		this.htmlElementID = this.htmlelement.htmlid + chartId;
		this.htmlclassname = this.htmlelement.htmlclassname;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.categories = categories;
		this.unselectedColor = this.htmlelement.unselectedColor;
		this.eventTarget = new EventTarget();
		this.fontSize = this.htmlelement.fontSize;
		this.defaultColor = "rgb(1,255,1)";
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
			x = radius,
			yStart = radius,
			max = 10,
			random =Math.floor((Math.random() * max) + 1),
			fontSize = this.fontSize;

		initBubbles();
		initLabels();
		setEnterAndExitBehaviour();			

		//appends a svg bubbles to container 
		function initBubbles(){
			bubbles = container
				.selectAll("bubbles")
				.append("svg")
				.attr("class", "bubbles")
				.data(that.categories);							
		}
		
		//appends a svg labels and sets width and height and position of labels
		function initLabels(){
			labels = container   
				.selectAll("labels")         
				.append("svg")
				.attr("width", that.width)
				.attr("height", that.label)
				.attr("class", "labels")
				.data(that.categories);
		}

		//sets the behaviour if a new data point is given or taken from bubbles and labels
		function setEnterAndExitBehaviour(){
			enterBubble();
			enterLabel();
			bubbles.exit().remove();
			labels.exit().remove();
		}

		//if a new  data point is entered a circle is appended 
		//the attr bubbleValue contains the value and is used to communicate
		//between labels and used in handleBubbleClick to receive the value 
		//which is attached to the bubble through a simple d3.select function call 
		function enterBubble(){
			bubbles.enter()
				.append("circle")
				.attr("class","bubble")
				.attr("bubbleValue", function(d){
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

		//if a new data point is appended
		//a new textlable is attached to labels		
		//which shows the value of the given data as an readable
		//text so the user knows the value of each bubble
		//as the text is next to the bubble containing the value
		function enterLabel(){			
			labels.enter()
				.append("g")
				.attr("class", "label")
				.attr("bubbleValue", function(d){					
					return d;
				})
				.append("text")			
				.attr("x", x + diameter)
				.attr("y", function(d,i){return calculateYPos(i);})           
				.attr("font-size", fontSize)
				.style("fill", function(d){return getColor(d)})
				.text(function(d) { return d; });
		}

		function calculateYPos(i){
			let factor = diameter+2;
			return yStart+factor*i;
		}

		//this function is called at onClick on a bubble
		//it reads the value of the bubble and
		//send it as an event
		//it also changes the color of the label and the bubble
		function handleBubbleClick() {
			let bubble = d3.select(this),
				value = bubble.attr("bubbleValue"),
				label = getLabelByBubbleValue(value);	
			changeColor(bubble, value);
			changeColor(label, value);
			sendSelectedValue(value);
		}

		//returns the label containting the bubbleValue value
		//so it can be selected and changed in handleBubbleClick
		function getLabelByBubbleValue(value){
			let selector = "g[bubbleValue='"+value+"']",
				label = d3.selectAll(selector).filter(".label").select("text");				
			return label;
		}

		//chagnes the colro of the given item
		//item is either a bubble or a label
		function changeColor(item, value) {
			let currentColor = item.style("fill");
			if(currentColor === that.unselectedColor){				
				item.style("fill", function(){					
					return getColor(value);
				});					
			}
			else{				
				item.style("fill", that.unselectedColor);
			}
		}

		//returns color according to value
		//if the color is a crime the crimeColor is returned
		//else the default value is returned
		function getColor(d){
			let crime = d,
				color = that.defaultColor;
			try{				
				color = commonfunctionsNamespace.getCrimeColor(crime);
			}
			catch(error){
				color = getDefaultColor();			
			}
			return color;
		}

		//returns a default color
		function getDefaultColor(){
			let random =Math.floor((Math.random() *  Math.floor(that.categories.length*2)) + 1),				
				r = random,
				g = random,
				b = random;
			return "rgb(" + r + "," + g + "," + b + ")";	
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