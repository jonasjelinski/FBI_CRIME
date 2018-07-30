/*---BUBBLE MENU--*/

//This class
//creates a BubbleMenu
//each bubble shows a different category
//onClick on a a bubble its color changes to this.unselected color
//and an event with the value of the bubble atteched to it is dispatched

class BubbleMenu extends MagicCircle{
	constructor(pageId,categories, chartId){
		super(pageId);
		this.chartId = chartId;
		this.labelId = this.chartId;
		this.bubbleId = this.chartId;
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
			fontSize = this.fontSize,
			getColor = this.getColor.bind(this);
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
				.attr("bubbleId", function(d){
					return that.bubbleId+d;
				})
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
				.attr("class", "bubbleLabel")
				.attr("labelId", function(d){
					return that.labelId+d;
				})
				.attr("bubbleValue", function(d){
					return d;
				})
				.append("text")
				.attr("bubbleValue", function(d){
					return d;
				})
				.attr("x", x + diameter)
				.attr("y", function(d,i){return calculateYPos(i);})
				.attr("font-size", fontSize)
				.style("fill", function(d){return getColor(d);})
				.text(function(d) { return getText(d); })
				.on("click", handleLabelClick);
		}

		function calculateYPos(i){
			let factor = diameter+2;
			return yStart+factor*i;
		}

		//converts text to easy readable strings
		//if the text is a crime
		//else returns just the text
		function getText(d){
			let text = d;
			if(that.isACrime(text)){
				text = configNamespace.REAL_CRIME_NAMES[text];
			}
			return text;		
		}

		//this function is called at onClick on a bubble
		//it reads the value of the bubble and
		//send it as an event
		//it also changes the color of the label and the bubble
		function handleBubbleClick() {
			let value = d3.select(this).attr("bubbleValue");
			that.changeBubblesAndLabelsByValue(value);
			sendSelectedValue(value);
		}

		//this function is called at onClick on a label
		//it reads the value of the label and
		//send it as an event
		//it also changes the color of the label and the bubble
		function handleLabelClick(){
			let value = d3.select(this).attr("bubbleValue");
			that.changeBubblesAndLabelsByValue(value);
			sendSelectedValue(value);
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

	//this function is called at onClick on a label
	//it reads the value of the label and
	//send it as an event
	//it also changes the color of the label and the bubble
	changeBubblesAndLabelsByValue(value){
		let label = this.getLabelByBubbleValue(value),
			bubble = this.getBubbleByLabelValue(value);
		this.changeColor(bubble, value);
		this.changeColor(label, value);
	}

	//returns the label containting the bubbleValue value
	//so it can be selected and changed in handleBubbleClick
	getLabelByBubbleValue(value){		
		let selector = "g[labelId='"+this.labelId+value+"']",
			label = d3.selectAll(selector).select("text");
		return label;
	}

	//returns the label containting the bubbleValue value
	//so it can be selected and changed in handleBubbleClick
	getBubbleByLabelValue(value){
		let selector = "circle[bubbleId='"+this.bubbleId+value+"']",
			bubble = d3.selectAll(selector);
		return bubble;
	}

	//chagnes the colro of the given item
	//item is either a bubble or a label
	changeColor(item, value) {
		let currentColor = item.style("fill"),
			that = this;
		if(currentColor === this.unselectedColor){
			item.style("fill", function(){
				
				return that.getColor(value);
			});
		}
		else{
			item.style("fill", that.unselectedColor);
		}
	}

	//returns color according to value
	//if the color is a crime the crimeColor is returned
	//else the default value is returned
	getColor(d){
		let crime = d,
			color = this.defaultColor,
			that = this;
		if(that.isACrime(crime)){
			color = commonfunctionsNamespace.getCrimeColor(crime);
		}			
		else{
			color = this.getDefaultColor();
		}		
		return color;
	}

	//returns true if the is a crime
	isACrime(text){
		let crimeTypes = commonfunctionsNamespace.getAllCrimeTypes(),
			categories = ["violentCrime", "propertyCrime"],
			allCrimeNames = crimeTypes.concat(categories);
		return allCrimeNames.includes(text);
	}

	//returns a default color
	getDefaultColor(){
		let random =Math.floor((Math.random() *  Math.floor(that.categories.length*2)) + 1),
			r = random,
			g = random,
			b = random;
		return "rgb(" + r + "," + g + "," + b + ")";
	}

}
