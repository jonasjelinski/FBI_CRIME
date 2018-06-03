//This class creates a SuburstChart with d3
//it shows the distribution between different crimecategories in a single state

class Sunburst extends MagicCircle{
	constructor(){
		super();
		this.self = this; 
		this.htmlelement = htmlelementsNamespace.SUN_BURST; 
		this.htmlElementID = this.htmlelement.rootid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;   
		this.state = dynamicsNamespace.currentState;
		this.year = dynamicsNamespace.currentYear;
		this.categories = [];
		this.crimes = [];	
		this.rootElement = this.getRootElement();   
	}    
	
	//returns the data which is necassray to build the sunburst	
	getData(){
		return configNamespace.JSON_OBJECT;        
	}
	
	//calls drawsunburst
	doChart(){
		console.log("ein lama erzeugt einen sunburst");
		drawSunBurst();	
	}

	//converts the data so it is usable and then draws the sunburst	
	drawSunBurst(){
		let data = this.createD3Data();
		this.createSunburst(data); 
	}

	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);      
	}

	//converts the jsondata in usable data for the d3 functions
	createD3Data () {
		let crimedata = commonfunctionsNamespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data),
			crimesdata = crimedata.crimes,    
			childrenObject = {},     
			rootJsonObject = {},
			newChild = {};
		rootJsonObject.name = "Crimes";
		rootJsonObject.children = [];
			
		for(let categorie in crimesdata){
			if(crimesdata !== undefined){
				let categorieCrimes = crimesdata[categorie],
					childrenArray = [];
				for(let crime in categorieCrimes){
					if(categorieCrimes !== undefined){
						childrenObject.name = crime;
						childrenObject.size = parseFloat(categorieCrimes[crime]);		
						childrenArray.push(childrenObject);
						childrenObject = {};	
					}					
				}
				newChild = this.self.createNewNode(categorie, childrenArray);
				rootJsonObject.children.push(newChild);
			}              
		}
		return rootJsonObject;
	}

	//creates a single node
	createNewNode(name, childrenarray){ 
		let newJsonObject = {};     
		newJsonObject.children = childrenarray;         
		newJsonObject.name = name;
		return newJsonObject;
	}

	//creates the sunburst with the given jsonData
	//source: https://bl.ocks.org/denjn5/f059c1f78f9c39d922b1c208815d18af
	//source: https://www.safaribooksonline.com/blog/2014/03/11/solving-d3-label-placement-constraint-relaxing/
	createSunburst(jsondata){ 
		let data = JSON.parse(JSON.stringify(jsondata)),     
			height =  this.width,
			width = this.height,
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
		drawSlices();	
		drawLabels();
		drawLines();

		//sets width and height of the rootElement
		function prepareRootElement(){
			rootElement = that.rootElement.attr("width", width).attr("height", height);
		}

		//appends a new htmlElement to the rootElement and sets his atrributes
		//this is the container where the suburst will be drawn in
		function initSunburst(){
			sunburst = rootElement
				.append(that.htmlElementType)
				.attr("width", width)
				.attr("class", "sunburst")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		}

		//appends a new htmlElement to the rootElement and sets his atrributes
		//this is the container where the labels will be drawn in
		function initLabels(){
			labels = rootElement            
				.append("g")
				.attr("width", labelWidth)
				.attr("height", labelHeight)
				.attr("class", "labels")
				.attr("transform", "translate(" + labelWidth + "," + labelHeight + ")");
		}

		//appends a new htmlElement to the rootElement and sets his atrributes
		//this is the container where the lines will be drawn in
		//which connect the sunburst with the labels
		function initLines(){
			lines = rootElement
				.append(that.htmlElementType)
				.attr("width", width)
				.attr("height", height)
				.attr("class", "lines")
				.attr("transform", "translate(" + lineWidth + "," + lineHeight + ")");
		}

		//sets the partition let
		//is used to determine the partition of the sunburst
		function initPartitionStructure(){
			partition = d3.partition().size([2 * Math.PI, radius]);
		}

		//sets the parent node of the hierarchical data		
		//d3.hierarchy(data[, children]) Constructs a root node from the specified hierarchical data.		
		function initParentNode(){
			parentNode = d3.hierarchy(data)
				.sum(function (d) { 
					let slizeSize = parseFloat(d.size);            		   		
					return slizeSize;
				});
		}

		//creates the partion with the hierarchy structure
		//and the partition 
		function structureParentNode(){
			partition(parentNode);
		}

		//inits the arc, which draws the sunburst
		function initArc(){
			arc = d3.arc()
				.startAngle(function (d) { return d.x0;})
				.endAngle(function (d) { return d.x1;})
				.innerRadius(function (d) { return d.y0;})
				.outerRadius(function (d) { return d.y1;});
			
		} 

		//inits the labelArc which determines where the labels appear
		function initLabelArc(){
			labelarc = arc;
		}

		//sets the data to the sunburst and how it should be drawn
		//if new data is given to the sunburst
		function drawSlices(){
			sunburst.selectAll("g")
				.data(parentNode.descendants())
				.enter().append("g").attr("class", "node").append("path")			
				.attr("display", function (d) { return d.depth ? null : "none"; })
				.attr("d", computeTransition())  
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)            
				.attr("d", arc)
				//.style("stroke", "black ")
				.style("fill", function(d){ return getColorByCrime(d);});  
		}

		//returns the Color according to the crime
		function getColorByCrime(d){
			let crimename = d.data.name,				  
				color = commonfunctionsNamespace.getCrimeColor(crimename),
				defaultcolor = "rgb(6,6,6)";
			if(color !== undefined){
				return color;
			}    
			return defaultcolor;
		}

		//sets the data to the labels and how it should be drawn
		//if new data is given to the labels
		function drawLabels(){
			labels.selectAll("g")				
				.attr("class", "labelname")
				.data(parentNode.descendants())
				.enter()
				.append("g").attr("class", "label")
				.append("text")
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)               
				.attr("x", function (d, i) { return computeTextXPos(d,i); })
				.attr("y",  function (d, i) { return computeTextYPos(d,i); }) 
				.attr("text-anchor", function(d,i){return computeTextAnchor(d,i);})
				.attr("font-size", "10px")
				.style("fill", "blue")
				.text(function(d) { return d.parent ? d.data.name : "" }); 
		}

		//sets the data to the lines and how it should be drawn
		//if new data is given to the lines
		function drawLines(){
			lines.selectAll("g")
				.data(parentNode.descendants())
				.enter().append("line").attr("class", "line")
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
								
		//calculates the textrotation
		function computeTextRotation(data) {
			let angle = (data.x0 + data.x1) / Math.PI * 90;
			// Avoid upside-down labels
			return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
			//return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
		}  

		//calculates the textpositon x
		function computeTextXPos(data, index){
			if(data.data.name === "Crimes"){
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

		//calculates the textpositon y
		function computeTextYPos(data, index){
			if(data.data.name === "Crimes"){
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
		
		//asures labels don"t overlap
		function asureDistanceToLabels(y){	  
			let minDistance = 40,
				distance = Math.abs(lastLabelYPos-y);
			if(distance < minDistance){			
				y = y+minDistance;
			}

			lastLabelYPos = y;
			return y;           
		}

		//calculates anchor of the the text
		function computeTextAnchor(data, index){
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				x = Math.cos(midAngle) * width/2;
			return (x > 0) ? "start" : "end";
		}

		//calculates the second x position of a line
		function computeLineX2(data, index){
			if(data.data.name === "Crimes"){
				return 0;
			}
			let centroid = labelarc.centroid(data),
				midAngle = Math.atan2(centroid[1], centroid[0]),
				x = Math.cos(midAngle) * labelWidth/2;
			return x;
		}

		//calculates the second y position of a line
		function computeLineY2(data, index){
			if(data.name === "Crimes"){
				return 0;
			}
			let centroid = labelarc.centroid(data), 
				midAngle = Math.atan2(centroid[1], centroid[0]),
				y = Math.sin(midAngle) * labelWidth/2;
			return y;
		}

		//calculates the position of a node
		function computeNodePosition(data, index){
			let pos = [0,0];    
			if(data.data.name === "Crimes"){					
				return pos;
			}
			pos = labelarc.centroid(data);
			return pos;                     
					
		}   

		//calculates the transition of the sunburst
		function computeTransition(data){
			let starPosition = 0,            
				startArc = d3.arc()
					.startAngle(function (data) { return starPosition;})
					.endAngle(function (data) { return  starPosition;})
					.innerRadius(function (data) { return starPosition;})
					.outerRadius(function (data) { return starPosition;});
			return startArc;
		} 
	}   

}

