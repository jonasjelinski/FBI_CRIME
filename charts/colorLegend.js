/*---COLOR LEGEND--*/

//This class
//creates a legend which contains colors
//with the colorvalues from startColor to endColor
//a title and
//two labels which describe the highest and the lowest value

class ColorLegend extends MagicCircle{
	constructor(chartId, pageId = "mainpage", title = "ColorLegend", startLabel= "0", endLabel= "1", startColor = "rgb(0,0,255)", endColor ="rgb(255,0,0)", valueMessage = "Value: ", startValue = 0, endValue = 1){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.colorLegend;
		this.htmlElementID = this.htmlelement.htmlid+chartId;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.bigWidth = this.htmlelement.bigWidth;
		this.bigHeight = this.htmlelement.bigHeight;
		this.title = title;
		this.startLabel = startLabel;
		this.endLabel = endLabel;
		this.startColor = startColor;
		this.endColor = endColor;
		this.startValue = startValue;
		this.endValue = endValue;
		this.valueMessage = valueMessage;
		this.sliceNumbers = this.htmlelement.sliceNumbers;
		this.sliceHeight = this.htmlelement.sliceHeight;
		this.sliceWidth = this.htmlelement.sliceWidth;
		this.sliceY = this.htmlelement.sliceY;
		this.sliceX = this.htmlelement.sliceX;
		this.titleY = this.htmlelement.titleY;
		this.titleX = this.htmlelement.titleX;
		this.titleSize = this.htmlelement.titleSize;
		this.labelY = this.htmlelement.labelY;
		this.labelX = this.htmlelement.labelX;
		this.labeSize = this.htmlelement.labeSize;
		this.sliceClass = this.htmlelement.sliceClass;
		this.sliceType = this.htmlelement.sliceType;
		this.titleClass = this.htmlelement.titleClass;
		this.titleType = this.htmlelement.titleType;
		this.labelClass = this.htmlelement.labelClass;
		this.labelType = this.htmlelement.labelType;
	}

	//creates the data and draws with data the colorlegend
	doChart(){
		let data = this.createScaleArray();
		this.drawColorLegend(data);
	}

	updateLegendValueAndDrawChart(minValue, maxValue){
		this.startValue = minValue;
		this.endValue = maxValue;
		this.doChart();
	}

	//returns an array in the range of the number of slices
	//so the ColorLegend has that many slices
	//fills the array with values between to startValue and minValue
	createScaleArray(){
		let numberOfSlices = this.sliceNumbers,
			scaleArray = [];
		for(let i = numberOfSlices; i > 0; i--){
			let value;
			if(i === numberOfSlices){
				value = this.startValue;
			}
			else if( i === 1){
				value= this.endValue;
			}
			else{
				value = this.endValue/i;
				value = (value).toFixed(2);
			}
			scaleArray.push(value);
		}
		return scaleArray;
	}

	//draws the color legend
	drawColorLegend(data){
		let colorScale,
			that = this,
			container = this.container,
			isSmall = true,
			sliceContainer,
			labelsContainer,
			titleContainer,
			promptLabel,
			title;

		initPromptLabel();
		initClickBevhaviour();
		initHoverBevhaviour();
		initColorScale();
		initSliceContainer();
		initLabelsContainer();
		initTitleContainer();
		appendSlices();
		appendLabels();
		appendTitle();

		//inits the label which tells the user
		//how to interact with the chart
		function initPromptLabel(){
			let inVisible = 0;
			promptLabel = container.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.text("click me!")
				.style("opacity", inVisible);
		}

		//inits click beavhiour
		//container changes size
		function initClickBevhaviour(){
			container.on("click", changeSizeAndBackgroundColor);
		}

		function initHoverBevhaviour(){
			container
				.on("mouseenter" ,showAndHideLabel)
				.on("mouseleave", hideLabel);
		}

		function showAndHideLabel(){
			let visible = 1,
				inVisible = 0,
				durationTime = 1000,
				coordinates = d3.mouse(this),
				x = that.sliceX+ that.width/2,
				y = that.sliceHeight;

			promptLabel
				.style("opacity", visible)
				.attr("x", x)
				.attr("y", y)
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)
				.style("opacity", inVisible);
		}

		function hideLabel(){
			let inVisible = 0;
			promptLabel
				.style("opacity", inVisible)
				.attr("transform", "translate(" + 0 + "," + 0 + ")");
		}

		//container gets smaller if container was big else big
		function changeSizeAndBackgroundColor(){
			if(isSmall){
				container
					.attr("width", that.bigWidth)
					.attr("height", that.bigHeight)
					.attr("class", "colorLegendBig");
			}
			else{
				container
					.attr("width",that.width)
					.attr("height",that.height)
					.attr("class", "colorLegendSmall");
			}
			isSmall = !isSmall;
		}

		//inits the linear colorScale
		function initColorScale(){
			colorScale = d3.scaleLinear().domain([0,that.sliceNumbers]).range([that.startColor, that.endColor]);
		}

		//inits the sliceContainer
		function initSliceContainer(){
			sliceContainer = container.append(that.sliceType).attr("class", that.sliceClass);
		}

		//inits the labelsContainer
		function initLabelsContainer(){
			labelsContainer = container.append(that.labelType).attr("class", that.labelClass);
		}

		//inits the titleContainer
		function initTitleContainer(){
			titleContainer = container.append(that.titleType).attr("class", that.titleClass);
		}

		//appends a rect for each value in data to sliceContainer
		function appendSlices(){
			sliceContainer
				.selectAll(".rects")
				.data(data)
				.enter()
				.append("rect")
				.attr("y", that.sliceHeight)
				.attr("x", function(d,i){return that.sliceX + i*that.sliceWidth;})
				.attr("height", that.sliceHeight)
				.attr("width", that.sliceWidth)
				.attr("fill", function(d,i){return getColor(i);})
				.attr("stroke", "gray")
				.on("mouseenter", showValue)
				.on("mouseout", hideValue);
		}

		function showValue(d) {
			let message = that.valueMessage + d;
			title.text(message);
		}

		function hideValue(d) {
			title.text(that.title);
		}

		//appends this.startLabel and this.endLabel as textElements to this chart
		//at the beginning and the end of the chart
		function appendLabels(){
			labelsContainer
				.selectAll(".text")
				.data(data)
				.enter()
				.append("text")
				.attr("class", "colorlegend label")
				.attr("y", that.labelY)
				.attr("x", function(d,i){return that.labelX + i*that.labelX;})
				.text(function(d,i){return getText(i);})
				.attr("font-family", "sans-serif")
				.attr("font-size", that.labeSize)
				.attr("fill", "black");

		}

		//apends this.title to the chart
		function appendTitle(){
			title = titleContainer
				.append("text")
				.attr("y", that.titleY)
				.attr("x", that.titleX)
				.text(that.title)
				.attr("font-family", "sans-serif")
				.attr("font-size", that.labeSize)
				.attr("fill", "black");
		}

		function getColor(i){
			return colorScale(i);
		}

		//returns the startLabel if i is the startvalue
		//if i is at the last slice it returns the endValue
		//so the labels are set at the beginning and the end of the chart
		function getText(i){
			if(i === 0){
				return that.startLabel;
			}
			else if(i === that.sliceNumbers-1){
				return that.endLabel;
			}
			return "";
		}
	}

}
