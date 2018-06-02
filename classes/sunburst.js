class Sunburst extends MagicCircle{
	constructor(){
		super();
		this.self = this; 
		this.htmlelement = htmlel_namespace.SUN_BURST; 
		this.htmlElementID = this.htmlelement.rootid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;   
		this.state = dynamics_namespace.currentState,
		this.year = dynamics_namespace.currentYear,
		this.categories = [],
		this.crimes = [],
		this.doChart = this.doChart.bind(this);
		this.drawSunburst = this.drawSunburst.bind(this);
		this.createD3Data = this.createD3Data.bind(this);
		this.createNewNode  = this.createNewNode.bind(this);
		this.createSunburst = this.createSunburst.bind(this);		
		this.rootElement = this.getRootElement();   
	}    
	
	getData () {
		return config_namespace.JSON_OBJECT;        
	}
	
	doChart () {
		console.log("ein lama erzeugt einen sunburst");
		this.self.drawSunburst();
	}

	drawSunburst () {
		let data = this.createD3Data();
		this.self.createSunburst(data);           
	}

	getRootElement(){
		return commonfunctions_namespace.getRootElement(this);      
	}

	createD3Data () {
		let crimedata = commonfunctions_namespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data),
			crimesdata = crimedata.crimes,    
			childrenObject = {},     
			rootJsonObject = {},
			newChild = {};
		rootJsonObject.name = "Crimes";
		rootJsonObject.children = [];
			
		for(let categorie in crimesdata){
			let categorieCrimes = crimesdata[categorie],
				childrenArray = [];

			for(let crime in categorieCrimes){
				childrenObject.name = crime;
				childrenObject.size = parseFloat(categorieCrimes[crime]);		
				childrenArray.push(childrenObject);
				childrenObject = {};
			}
			newChild = this.self.createNewNode(categorie, childrenArray);
			rootJsonObject.children.push(newChild);              
		};
		return rootJsonObject;
	}

	createNewNode(name, childrenarray){ 
		let newJsonObject = {};     
		newJsonObject.children = childrenarray;         
		newJsonObject.name = name;
		return newJsonObject;
	}

	getWidth(){
		return this.width;
	}

	getHeight(){
		return this.height;
	}

	//source: https://bl.ocks.org/denjn5/f059c1f78f9c39d922b1c208815d18af
	//source: https://www.safaribooksonline.com/blog/2014/03/11/solving-d3-label-placement-constraint-relaxing/
	createSunburst(jsondata){ 
		let data = JSON.parse(JSON.stringify(jsondata)),     
			height = this.self.getHeight(),
			width = this.self.getWidth(),
			that = this,
			widthGrafic = width*0.5,
			heightGrafic = height*0.5,
			radius = Math.min(widthGrafic, heightGrafic) / 2,
			labelWidth = width/2,
			labelHeight = labelWidth,			
			lastLabelYPos = 0,
			lineWidth = labelWidth,
			lineHeight = labelHeight,
			durationTime = 2000,      
			rootElement,
			sunburst,
			labels,
			lines,
			partition,
			parentNode,
			arc,
			labelarc;

		prepareRootElement();
		initSunburst();
		initLabels();
		initLines();
		initPartitionStructure();
		initParentNode();
		initArc();
		initLabelArc();
		structureParentNode();
		setSunBurstDataAndDrawBehaviour();	
		setLabelsDataAndDrawBehaviour();
		setLinesDataAndDrawBehaviour();	

		function prepareRootElement(){
			rootElement = that.rootElement.attr("width", width).attr("height", height);
		}

		function initSunburst(){
			sunburst = rootElement
				.append(that.htmlElementType)
				.attr("width", width)
				.attr('class', 'sunburst')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
		}

		function initLabels(){
			labels = rootElement            
				.append('g')
				.attr("width", labelWidth)
				.attr("height", labelHeight)
				.attr('class', 'labels')
				.attr('transform', 'translate(' + labelWidth + ',' + labelHeight + ')');
		}

		function initLines(){
			lines = rootElement
				.append(that.htmlElementType)
				.attr("width", width)
				.attr("height", height)
				.attr('class', 'lines')
				.attr('transform', 'translate(' + lineWidth + ',' + lineHeight + ')');
		}

		function initPartitionStructure(){
			partition = d3.partition()
				.size([2 * Math.PI, radius]);
		}

		function initParentNode(){
			parentNode = d3.hierarchy(data)
				.sum(function (d) { 
					let slizeSize = parseFloat(d.size);            		   		
					return slizeSize;
				});
		}

		function structureParentNode(){
			partition(parentNode);
		}

		function initArc(){
			arc = d3.arc()
				.startAngle(function (d) { return d.x0;})
				.endAngle(function (d) { return d.x1;})
				.innerRadius(function (d) { return d.y0;})
				.outerRadius(function (d) { return d.y1;});
			
		} 

		function initLabelArc(){
			labelarc = arc;
		}

		function setSunBurstDataAndDrawBehaviour(){
			sunburst.selectAll('g')
				.data(parentNode.descendants())
				.enter().append('g').attr("class", "node").append('path')			
				.attr("display", function (d) { return d.depth ? null : "none"; })
				.attr("d", computeTransition())  
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)            
				.attr("d", arc)
				//.style("stroke", "black ")
				.style("fill", function(d){ return getColorByCrime(d);});  
		}

		function getColorByCrime(d){
			let crimename = d.data.name,				  
				color = commonfunctions_namespace.getCrimeColor(crimename),
				defaultcolor = "rgb(6,6,6)";
			if(color !== undefined){
				return color;
			}    
			return defaultcolor;
		}	

		function setLabelsDataAndDrawBehaviour(){
			labels.selectAll('g')				
				.attr("class", "labelname")
				.data(parentNode.descendants())
				.enter()
				.append('g').attr("class", "label")
				.append("text")
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)               
				.attr("x", function (d, i) { return computeTextXPos(d,i); })
				.attr("y",  function (d, i) { return computeTextYPos(d,i); }) 
				.attr("text-anchor", function(d,i){return computeTextAnchor(d,i);})
				.attr("font-size", "10px")
				.style('fill', 'blue')
				.text(function(d) { return d.parent ? d.data.name : "" }); 
		}

		function setLinesDataAndDrawBehaviour(){
			lines.selectAll('g')
				.data(parentNode.descendants())
				.enter().append('line').attr("class", "line")
				.transition()
				.ease(d3.easeLinear)
				.duration(2000)  
				.attr("x1", function (d, i) {return computeTextXPos(d,i);})
				.attr("y1", function (d, i) {return computeTextYPos(d,i);}) 
				.attr("x2", function (d, i) {return computeNodePosition(d,i)[0]})
				.attr("y2", function (d, i) {return computeNodePosition(d,i)[1]})
				.attr("stroke-width", 1)
				.attr("stroke", "black");		
		}
								
		//functions to compute positions and transitions    

		function computeTextRotation(data) {
			let angle = (data.x0 + data.x1) / Math.PI * 90;
			// Avoid upside-down labels
			return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
			//return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
		}  

		function computeTextXPos(data, index){
			if(data.data.name === 'Crimes'){
				return 0;
			}
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				x = Math.cos(midAngle) * labelWidth/2,
				sign = (x > 0) ? 1 : -1,
				multiplier = 4*index,
				labelX = x + (multiplier * sign);			
			return labelX;
		}

		function computeTextYPos(data, index){
			if(data.data.name === 'Crimes'){
				return 0;
			}
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				multiplier = index*9,
				y = Math.sin(midAngle)*labelWidth,
				sign = 0.75;            
			y = y*sign;			 
			y = asureDistanceToLabels(y);	
			return y;
		}
		
		function asureDistanceToLabels(y){	  
			let minDistance = 40,
				distance = Math.abs(lastLabelYPos-y);
			if(distance < minDistance){			
				y = y+minDistance;
			}

			lastLabelYPos = y;
			return y;           
		}

		function computeTextAnchor(data, index){
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				x = Math.cos(midAngle) * width/2;
			return (x > 0) ? "start" : "end";
		}

		function computeLineX2(data, index){
			if(data.data.name === "Crimes"){
				return 0;
			}
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				x = Math.cos(midAngle) * labelWidth/2;
			return x;
		}

		function computeLineY2(data, index){
			if(data.name === "Crimes"){
				return 0;
			}
			let centroid = labelarc.centroid(data), 
				midAngle = Math.atan2(centroid[1], centroid[0]),
				y = Math.sin(midAngle) * labelWidth/2;
			return y;
		}

		function computeNodePosition(data, index){
			let pos = [0,0];    
			if(data.data.name === "Crimes"){					
				return pos;
			}
			pos = labelarc.centroid(data);
			return pos;                     
					
		}   

		function computeTransition(data){            
			let startArc = d3.arc()
				.startAngle(function (data) { return 0})
				.endAngle(function (data) { return  0})
				.innerRadius(function (data) { return 0})
				.outerRadius(function (data) { return 0});
			return startArc;
		} 
	}   

}

