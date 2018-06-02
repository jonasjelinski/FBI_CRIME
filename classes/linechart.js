class LineChart extends MagicCircle{
	constructor(){
		super();
		this.state = dynamicsNamespace.currentState;
		this.htmlelement = htmlelementsNamespace.LINE_DIAGRAM; 
		this.htmlElementID = this.htmlelement.rootid;
		this.rootElement = this.getRootElement();
	}
	
	doChart(){
		console.log("ein lama erzeugt einen linechart");       
		this.drawLineChart();
		
	}

	drawLineChart(){
		let data = this.createD3Data();
		this.createCoordinateSystem(data);
	}
	
	createD3Data(){
		let crimeTypesProperty = configNamespace.CONSTANTS.crimeTypesProperty,
			crimeTypesViolence  = configNamespace.CONSTANTS.crimeTypesViolence,
			allCrimes = crimeTypesProperty.concat(crimeTypesViolence),
			maxYear = configNamespace.CONSTANTS.maxYear,
			minYear = configNamespace.CONSTANTS.minYear,
			d3Data = [];
		
		for(let i=0; i<allCrimes.length; i++){
			let newObject = {};
			let values = [];
			let crimename = allCrimes[i];           
			if(crimename === undefined){
				console.log("crimename undefined");
				continue;
			}
			newObject.key = crimename;	
			for(let year = minYear; year <=2012; year++){
				let newValueObject = {},
					numberOfCrimes = commonfunctionsNamespace.getCrimerateByCrimeType(year, this.state, crimename, this.data);         
				newValueObject.year = year;
				newValueObject.crimerate = numberOfCrimes;
				values.push(newValueObject);
				newValueObject = {};
			}
			newObject.values = values;
			d3Data.push(newObject);
			newObject = {};
		}   

		return d3Data;
	}
		
	//sources:
	//https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
	//https://bl.ocks.org/deristnochda/1ffe16ccf8bed2035ea5091ab9bb53fb
	createCoordinateSystem(jsondata){
		var data = JSON.parse(JSON.stringify(jsondata)),
			that =this,
			height = this.height,
			width = this.width,
			labelWidth = width/5,
			labelHeight = labelWidth/5,			
			rootElement,
			maxYear = configNamespace.CONSTANTS.maxYear,
			minYear = configNamespace.CONSTANTS.minYear,
			minCrime = 0,
			maxCrime = 2000,
			mindate = new Date(minYear,0,1),
			maxdate = new Date(maxYear,0,31),			
			margin = {top: height/10, right: width/10, bottom: height/10, left: width/10},
			chartWidth = width - margin.left - margin.right,
			chartHeight = height - margin.top - margin.bottom,
			
			xRange = d3.scaleTime().domain([mindate, maxdate]).range([0,chartWidth ]), 
			yRange = d3.scaleLinear().domain([minCrime, maxCrime]).range([chartHeight, 0]),
			
			xAxis = d3.axisBottom(xRange), 
			yAxis = d3.axisLeft(yRange),
			deltaAxisY = chartHeight-margin.bottom,
			zooming,
			container,
			coordinateSystem,
			xCoordLine,
			yCoordLine,
			allGraphLines,
			singleLine,
			labels;

		initZoomingBehaviour();
		prepareRootElement();	
		initContainer();		
		initCoordinateSystem();
		initXCoordLine();
		initYCoordLine();
		initallGraphLines();	
		initLabels();
		initSingleLine();
		setGraphLinesDataAndDrawBehaviour();
		setLabelsDataAndDrawBehaviour();
		setLabelText();

		function initZoomingBehaviour(){
			zooming = d3.zoom()
				.scaleExtent([1, Infinity])
				.translateExtent([[0, 0], [width, height]])
				.extent([[0, 0], [width, height]])
				.on("zoom", zoomed);
		}

		function prepareRootElement(){
			rootElement = that.rootElement.attr("width", width).attr("height", height).call(zooming);	
		}

		function initContainer(){
			container = rootElement.append("svg").attr("class", "container")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                            
				.attr("transform", "translate(" + margin.left + "," + 0 + ")");  
		}	

		function initCoordinateSystem(){
			coordinateSystem = rootElement.append("g").attr("class", "coordinateSystem")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                            
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");				
		} 

		function initXCoordLine(){
			xCoordLine = coordinateSystem.append("g").attr("class", "xAxis")
				.attr("transform", "translate(0,"+(deltaAxisY)+")")                                                                 
				.call(xAxis);
		}

		function initYCoordLine(){
			yCoordLine = coordinateSystem.append("g").attr("class", "yAxis")
				.attr("transform","translate(0,-"+margin.bottom+")")
				.call(yAxis);
		}

		function initallGraphLines(){
			allGraphLines = container.append("g").attr("class", "lines")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                                                
				.style("fill", "white");
		}	

		function getXPos(d){
			let year = parseInt(d.year),
				date = new Date(year,0,1);                      
			return xRange(date);		
		}

		function getYPos(d){
			let crimerate = parseInt(d.crimerate); 
			return yRange(crimerate);
		}			

		function setGraphLinesDataAndDrawBehaviour(){
			let selectedGraphLines = rootElement.selectAll(".lines"),
				visible =1;        
			selectedGraphLines
				.selectAll("line")
				.data(data)
				.enter()
				.append("path")
				.attr("class", "line")      
				.attr("id", function(d){
					return d.key;
				})
				.attr("d", function(d){				
					let line = singleLine(d.values);    
					return line;
				})          
				.attr("stroke", function(d){
					return getColor(d);
				})
				.attr("fill","none")
				.attr("opacity", visible);
		}

		function initSingleLine(){
			singleLine = d3.line()
				.x(function(d){return getXPos(d);})                                
				.y(function(d){return getYPos(d);});		
		}	

		function initLabels(){
			labels = rootElement            
				.append('g')
				.attr("width", labelWidth)
				.attr("height", labelHeight)
				.attr('class', 'labels')       
				.attr('transform', 'translate(' + (width - 4*margin.right-labelWidth) + ',' + labelHeight + ')');
		}

		function setLabelsDataAndDrawBehaviour(){			
			labels.selectAll('g')
				.data(data)
				.enter().append('g').attr("class", "label"); 
		}

		function setLabelText(){
			labels.selectAll('g')
				.attr("class", function(d){return d.key;})
				.append("text")
				.on("click", that.showOrHideLine)
				.transition()
				.ease(d3.easeLinear)
				.duration(2000)               
				.attr("x", 0)
				.attr("y", function(d,i){return i*labelHeight*1.5;})           
				.attr("font-size", "50px")
				.style('fill', function(d){return getColor(d)})
				.text(function(d) { return d.key; });
		} 				
	
		function showOrHideLine(d){
			let crime = d.key,
				id = "[id="+crime+"]",        
				line = d3.select(id),
				visible = parseInt(line.attr("opacity")),           
				newOpacity = visible ? 0 : 1;           
			line.attr("opacity", newOpacity);        
		}

		function getColor(d){
			let crime = d.key;
			return commonfunctionsNamespace.getCrimeColor(crime);
		}           

		function zoomed() {                 
			let allLines = rootElement.selectAll(".lines")
					.transition().duration(750)
					.attr("transform", d3.event.transform),     
				lines = d3.selectAll('.line').style("stroke-width", 2/d3.event.transform.k),             
				xCall = xCoordLine.transition().duration(750).call(xAxis.scale(d3.event.transform.rescaleX(xRange))),
				yCall = yCoordLine.transition().duration(750).call(yAxis.scale(d3.event.transform.rescaleY(yRange)));                       
		}
	}
}