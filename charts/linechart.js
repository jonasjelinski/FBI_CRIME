/*---LINE CHART--*/

//This class
//creates a line chart
//the linechart shows the crimerates over the time
//for a special state, for each crime
//lines can be hidden or set visible
//chart can be zoomed

class LineChart extends MagicCircle{
	constructor(pageId, state = configNamespace.STATES_AND_CRIMES.states[0]){
		super(pageId);
		this.state = state;
		this.htmlelement = htmlelementsNamespace.lineDiagramm; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.xAxisLabelX = this.htmlelement.xAxisLabelX;
		this.xAxisLabelY = this.htmlelement.xAxisLabelY;
		this.yAxisLabelX = this.htmlelement.yAxisLabelX;
		this.yAxisLabelY = this.htmlelement.yAxisLabelY;
	}
	
	//calls drawLineChart
	doChart(){      
		this.drawLineChart();		
	}

	setState(state){
		this.state = state;
	}
	
	//converts the this.data so it is usable and then draws the lineChart	
	drawLineChart(){
		let crimeRatesPerYearAndPerCrimeType = this.createCrimeRateData();
		this.createLineChart(crimeRatesPerYearAndPerCrimeType);
	}
	
	//converts the data so it is usable for the lineChart
	//returns an array of objects
	//each newCrimeObject has a crimetype e.g. burglary as its key
	//each newCrimeObject contains newValueObjects
	//newValueObjectes contains of years and number of crimes in each year
	createCrimeRateData(){
		let allCrimeTypes = this.getAllCrimeTypes(),		
			crimeRatesPerYearAndPerCrimeType = this.getCrimesRatesForEachCrimeForEachYear(allCrimeTypes);
		return crimeRatesPerYearAndPerCrimeType;
	}

	//rerurns all crimetyes e.g. burglary
	getAllCrimeTypes(){
		let crimeTypesProperty = configNamespace.STATES_AND_CRIMES.crimeTypesProperty,
			crimeTypesViolence = configNamespace.STATES_AND_CRIMES.crimeTypesViolence,
			allCrimeTypes = crimeTypesProperty.concat(crimeTypesViolence);
		return allCrimeTypes;
	}

	//returns for alle received crimeTypes the year and the crimerate per year
	getCrimesRatesForEachCrimeForEachYear(allCrimeTypes){
		let crimeRatesPerYearAndPerCrimeType = [];
		for(let i=0; i<allCrimeTypes.length; i++){			
			let newCrimeRatePerCrimeAndCrimeTypeObject, 
				crimeType = allCrimeTypes[i];           
			if(this.wouldCreateUndefinedEntry(crimeType)){	
				continue;
			}
			newCrimeRatePerCrimeAndCrimeTypeObject = this.createNewCrimeRatePerCrimeAndCrimeTypeObject(crimeType);
			crimeRatesPerYearAndPerCrimeType.push(newCrimeRatePerCrimeAndCrimeTypeObject);
			newCrimeRatePerCrimeAndCrimeTypeObject = {};
		}
		return crimeRatesPerYearAndPerCrimeType;   
	}

	//prevents undefined entries
	wouldCreateUndefinedEntry(crimeType){
		if(crimeType === undefined){				
			return true;
		}
		return false;
	}

	//returns an object which consists crimetype as key and the values-array
	//which contains the crimerates for each year in an object
	createNewCrimeRatePerCrimeAndCrimeTypeObject(crimeType){
		let newCrimeRatePerCrimeAndCrimeTypeObject = {},
			values = [];
		newCrimeRatePerCrimeAndCrimeTypeObject.key = crimeType;	
		values = this.getCrimeRatesForEachYear(crimeType);		
		newCrimeRatePerCrimeAndCrimeTypeObject.values = values;
		return newCrimeRatePerCrimeAndCrimeTypeObject;
	}

	//returns an array which contains the crimerates for each year in an object
	getCrimeRatesForEachYear(crimeType){
		let crimesPerYear = [],
			maxYear = configNamespace.STATES_AND_CRIMES.maxYear,
			minYear = configNamespace.STATES_AND_CRIMES.minYear;
		for(let year = minYear; year <= maxYear; year++){
			let newcrimesPerYearObject = this.getCrimesPerYearObject(crimeType, year);			
			crimesPerYear.push(newcrimesPerYearObject);
			newcrimesPerYearObject = {};
		}

		return crimesPerYear;
	}

	//returns a single object which keys are year and crimerate
	getCrimesPerYearObject(crimeType, year){
		let crimesPerYearObject = {},
			numberOfCrimes = commonfunctionsNamespace.getCrimerateByCrimeType(year, this.state, crimeType, this.data);         
		crimesPerYearObject.year = year;
		crimesPerYearObject.crimerate = numberOfCrimes;
		return crimesPerYearObject;
	}
	
	//creates the lineChart	with the given crimeRateData
	//sources:
	//https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
	//https://bl.ocks.org/deristnochda/1ffe16ccf8bed2035ea5091ab9bb53fb
	//https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
	createLineChart(crimeRateData){
		var data = transferToCleanJavascriptObject(crimeRateData),		
			that =this,
			height = this.height,
			width = this.width,
			labelWidth = width/5,
			labelHeight = labelWidth/5,			
			container = this.container,
			maxYear = configNamespace.STATES_AND_CRIMES.maxYear,
			minYear = configNamespace.STATES_AND_CRIMES.minYear,
			minCrime = 0,
			maxCrime = 4000,
			mindate = new Date(minYear,0,1),
			maxdate = new Date(maxYear,0,31),			
			margin = {top: height/8, right: width/10, bottom: height/10, left: width/10},
			chartWidth = width - margin.left - margin.right,
			chartHeight = height - margin.top - margin.bottom,
			axisDateLabelX = width/2 + this.xAxisLabelX,
			axisDateLabelY = height - margin.bottom-margin.bottom + this.xAxisLabelY,			
			axisNumberLabelX = - chartWidth/2 + this.yAxisLabelX,			
			axisNumberLabelY = + margin.left + this.yAxisLabelY,			
			xRange = d3.scaleTime().domain([mindate, maxdate]).range([0,chartWidth ]), 
			yRange = d3.scaleLinear().domain([minCrime, maxCrime]).range([chartHeight, 0]),
			
			xAxis = d3.axisBottom(xRange), 
			yAxis = d3.axisLeft(yRange),
			deltaAxisY = chartHeight-margin.bottom,
			durationTime = 1000,
			zooming,
			canvas,
			coordinateSystem,
			xCoordLine,
			yCoordLine,
			allGraphLines,
			singleLine,
			label;	
			
		initZoomingBehaviour();
		initLabel();
		prepareContainer();	
		initCanvas();		
		initCoordinateSystem();
		initXCoordLine();
		initYCoordLine();
		initAllGraphLines();	
		initSingleLine();
		drawGraph();	
		appendDateLabel();
		appendNumberLabel();

		//calls the d3 zoom function to zoom the lineChart
		function initZoomingBehaviour(){
			zooming = d3.zoom()
				.scaleExtent([1, Infinity])
				.translateExtent([[0, 0], [width, height]])
				.extent([[0, 0], [width, height]])
				.on("zoom", zoomCoordSystemAndLines);
		}

		//inits the label which tells the user
		//how to interact with the chart
		function initLabel(){
			let inVisible = 0;
			label = container.append("text")
				.attr("x", 0)        
				.attr("y", 0)        
				.style("text-anchor", "middle")
				.text("Scroll to zoom!")
				.style("opacity", inVisible);
		}

		//sets width and height of the rootElement
		function prepareContainer(){
			container
				.call(zooming)
				.style("pointer-events", "all")
				.on("mouseenter" ,showAndHideLabel)  
				.on("mouseleave", hideLabel);  
		}

		function showAndHideLabel(){
			let visible = 1,
				inVisible = 0,
				durationTime = 2000,
				coordinates = d3.mouse(this),
				x = that.width/2,
				y = that.height/2;			
			label
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
			label
				.style("opacity", inVisible)
				.attr("transform", "translate(" + 0 + "," + 0 + ")");
		}		

		//inits container and sets width and height and position of the canvas
		function initCanvas(){
			canvas = container.append("svg").attr("class", "canvas").attr("id", "lineChartCanvas")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                            
				.attr("transform", "translate(" + margin.left + "," + 0 + ")");
		}				

		//inits coordinateSystem and sets width and height and position of the coordindate system
		function initCoordinateSystem(){
			coordinateSystem = container.append("g").attr("class", "coordinateSystem")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                            
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");				
		} 

		//inits xCoordLine and sets width and height and position of the xAxis
		function initXCoordLine(){
			xCoordLine = coordinateSystem.append("g").attr("class", "xAxis")
				.attr("transform", "translate(0,"+(deltaAxisY)+")")                                                                 
				.call(xAxis);
		}

		//inits yCoordLine and sets width and height and position of the yAxis
		function initYCoordLine(){
			yCoordLine = coordinateSystem.append("g").attr("class", "yAxis")
				.attr("transform","translate(0,-"+margin.bottom+")")
				.call(yAxis);
		}

		//inits allGraphLines and sets width and height and position of allGraphLines
		function initAllGraphLines(){
			allGraphLines = canvas.append("g").attr("class", "lines")
				.attr("width", chartWidth)
				.attr("height", chartHeight)                                                                
				.style("fill", "white");
		}

		//inits singleLine which is a d3.line function 
		function initSingleLine(){
			singleLine = d3.line()
				.x(function(d){return getXPos(d);})                                
				.y(function(d){return getYPos(d);});		
		}		

		//tranforms a string 'year' to a date which can be used on the x-Axis
		function getXPos(d){
			let year = parseInt(d.year),
				date = new Date(year,0,1);                      
			return xRange(date);		
		}

		//tranforms a string 'crimerate' to a number which can be used on the y-Axis
		function getYPos(d){
			let crimerate = parseInt(d.crimerate); 
			return yRange(crimerate);
		}			

		//gives data to selectedGraphLines and draws new lines with new data on enter
		function drawGraph(){
			let selectedGraphLines = container.selectAll(".lines"),
				invisible = 0,
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
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)  
				.attr("d", function(d){				
					let line = singleLine(d.values);    
					return line;
				})          
				.attr("stroke", function(d){
					return getColor(d);
				})
				.attr("fill","none")
				.attr("opacity", invisible)
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)  
				.attr("opacity", visible);
		}	

		//hides line if visible, shows line if it has been invisible before
		function showOrHideLine(d){
			let crime = d.key,
				isHidden = 0,
				isVisible = 1,
				id = "[id="+crime+"]",        
				line = d3.select(id),
				visible = parseInt(line.attr("opacity")),           
				newOpacity = visible === isVisible ? isHidden : isVisible;           
			line.attr("opacity", newOpacity);        
		}

		//returns color according to crimeType
		function getColor(d){
			let crime = d.key;
			return commonfunctionsNamespace.getCrimeColor(crime);
		}           

		//zooms in and out of the chart
		function zoomCoordSystemAndLines() { 
			let transitionZoomTime = 750,                
				allLines = container.selectAll(".lines")
					.transition().duration(transitionZoomTime)
					.attr("transform", d3.event.transform),     
				lines = d3.selectAll(".line").style("stroke-width", 2/d3.event.transform.k),             
				xCall = xCoordLine.transition().duration(transitionZoomTime).call(xAxis.scale(d3.event.transform.rescaleX(xRange))),
				yCall = yCoordLine.transition().duration(transitionZoomTime).call(yAxis.scale(d3.event.transform.rescaleY(yRange)));                       
		}

		function transferToCleanJavascriptObject(jsondata){
			return JSON.parse(JSON.stringify(jsondata));
		}

		function appendDateLabel(){
			container.append("text")
				.attr("x", axisDateLabelX)        
				.attr("y", axisDateLabelY)        
				.style("text-anchor", "middle")
				.text("Date");
		}

		function appendNumberLabel(){
			container.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", axisNumberLabelX)        
				.attr("y", axisNumberLabelY)              
				.style("text-anchor", "middle")
				.text("Number of crimes per 100 000 inhabits");
		}
	}

	//hides line if visible, shows line if it has been invisible before
	showOrHideLine(crimeType){
		let crime = crimeType,
			isHidden = 0,
			isVisible = 1,
			id = "[id="+crime+"]",        
			line = d3.select(id),
			visible = parseInt(line.attr("opacity")),           
			newOpacity = visible === isVisible ? isHidden : isVisible;           
		line.attr("opacity", newOpacity);        
	}	

}