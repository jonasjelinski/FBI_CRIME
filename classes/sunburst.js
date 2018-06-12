//This class creates a SuburstChart with d3
//it shows the distribution between different crimecategories in a single state

class Sunburst extends MagicCircle{
	constructor(pageId, state = configNamespace.CONSTANTS.states[0], year = 2008){
		super(pageId);
		this.self = this; 
		this.htmlelement = htmlelementsNamespace.SUN_BURST; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;		
		this.height = this.htmlelement.height;   
		this.state = state;
		this.year = year;
		this.categories = [];
		this.crimes = [];	
		this.page = this.getRootElement();   
	}    
	
	//returns the data which is necassray to build the sunburst	
	getData(){
		return configNamespace.JSON_OBJECT;        
	}
	
	//calls drawsunburst
	doChart(){		
		this.drawSunBurst();
	}

	//converts the data so it is usable and then draws the sunburst	
	drawSunBurst(){
		let hierarchyData = this.createHierarchyData();
		this.createSunburst(hierarchyData); 
	}

	getRootElement(){
		return commonfunctionsNamespace.getRootElement(this);      
	}

	//converts the jsondata in usable data for the d3 functions
	createHierarchyData(){		
		let crimedata = commonfunctionsNamespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data),
			crimesdata = crimedata.crimes,			    
			rootJsonObject = {},
			newChild = {};
		rootJsonObject.name = "Crimes";
		rootJsonObject.children = [];
		rootJsonObject = this.createNodeStructure(crimesdata, rootJsonObject);
		return rootJsonObject;
	}

	createNodeStructure(crimesdata, rootJsonObject){		
		for(let categorie in crimesdata){
			if(crimesdata !== undefined){
				let categorieCrimes = crimesdata[categorie],
					childrenArray = this.createChildArray(categorieCrimes),					
					newChild = this.self.createNewNode(categorie, childrenArray);
				rootJsonObject.children.push(newChild);
			}              
		}
		return rootJsonObject;
	}

	createChildArray(categorieCrimes){
		let childrenArray = [];					
		for(let crime in categorieCrimes){
			if(categorieCrimes !== undefined){
				let childrenObject = this.createChildObject(categorieCrimes, crime);
				childrenArray.push(childrenObject);						
			}					
		}
		return childrenArray;
	}

	createChildObject(categorieCrimes, crime){
		let childrenObject = {};
		childrenObject.name = crime;
		childrenObject.size = parseFloat(categorieCrimes[crime]);
		return childrenObject;
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
	createSunburst(hierarchyData){ 
		let data = transferToCleanJavascriptObject(hierarchyData),     
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
			container = this.container,
			sunburst,
			labels,
			lines,
			partition,
			parentNode,
			arc,
			labelarc;
		
		initSunburst();
		initLabels();
		initLines();
		initPartitionStructure();
		initParentNode();
		initArc();
		initLabelArc();
		transformHierarchyDataIntoSliceData();
		drawSlices();	
		drawLabels();
		drawLines();

		//appends a new htmlElement to the rootElement and sets his atrributes
		//this is the container where the suburst will be drawn in
		function initSunburst(){
			sunburst = container
				.append(that.htmlElementType)
				.attr("width", width)
				.attr("height", height)
				.attr("class", "sunburst");
		}

		//appends a new htmlElement to the rootElement and sets his atrributes
		//this is the container where the labels will be drawn in
		function initLabels(){
			labels = container            
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
			lines = container
				.append(that.htmlElementType)
				.attr("width", width)
				.attr("height", height)
				.attr("class", "lines");				
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
		function transformHierarchyDataIntoSliceData(){
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
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")			
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
				.attr("transform", "translate(" + lineWidth + "," + lineHeight + ")")
				.attr("stroke-width", 1)
				.attr("stroke", "black");		
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
		
		//asures labels dont overlap
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

		function transferToCleanJavascriptObject(jsondata){
			return JSON.parse(JSON.stringify(jsondata));
		} 
	}   

}

