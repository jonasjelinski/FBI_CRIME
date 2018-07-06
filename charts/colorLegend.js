//This class
//creates a legend which contains colors
//with the colorvalues from startColor to endColor
//a title and
//two labels which describe the highest and the lowest value  

class ColorLegend extends MagicCircle{
	constructor(chartId, pageId = "mainpage", title = "ColorLegend", startLabel= "0", endLabel= "1", startColor = "rgb(0,0,255)", endColor ="rgb(255,0,0)", startValue = 0, endValue = 1){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.colorLegend; 
		this.htmlElementID = this.htmlelement.htmlid+chartId;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.title = title;
		this.startLabel = startLabel;
		this.endLabel = endLabel;
		this.startColor = startColor;
		this.endColor = endColor;
		this.startValue = startValue;
		this.endValue = endValue;
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
		console.log("A lama draws a ColorLegend");
		let data = this.createScaleArray();
		this.drawColorLegend(data);
	}

	//returns an array in the range of the number of slices
	//so the ColorLegend has that many slices
	createScaleArray(){		
		return d3.range(this.sliceNumbers);
	}

	//draws the color legend
	drawColorLegend(data){
		let colorScale,
			that = this,
			container = this.container,
			scaleWidth = this.width/this.endValue,
			scaleHeight = this.height/this.endValue,
			sliceContainer,
			labelsContainer,
			titleContainer;
			
		initColorScale();
		initSliceContainer();
		initLabelsContainer();
		initTitleContainer();
		appendSlices();
		appendLabels();
		appendTitle();

		//inits the linear colorScale 
		function initColorScale(){
			colorScale = d3.scaleLinear().domain([that.startValue,that.sliceNumbers]).range([that.startColor, that.endColor]);
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
				.attr("stroke", "gray");						
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
			titleContainer
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
			if(i === that.startValue){
				return that.startLabel;
			}
			else if(i === that.sliceNumbers-1){
				return that.endLabel;
			}
			return "";		
		}
	}

}