class LineChart extends MagicCircle{
	constructor(){
		super();

		this.state = dynamics_namespace.currentState;
		this.htmlelement = htmlel_namespace.LINE_DIAGRAM; 
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
	}
	
	doChart(){
		 console.log("ein lama erzeugt einen linechart");
		 this.drawLineChart();
	}
	
	createD3Data(){
		let crimeTypesProperty = config_namespace.CONSTANTS.crimeTypesProperty;
		let crimeTypesViolence  = config_namespace.CONSTANTS.crimeTypesViolence;
		let allCrimes = crimeTypesProperty.concat(crimeTypesViolence);
		let maxYear = config_namespace.CONSTANTS.maxYear;
		let minYear = config_namespace.CONSTANTS.minYear;
		let d3Data = [];
		
		for(let i=0; i<allCrimes.length; i++){
			let newObject = {};
			let values = [];
			let crimename = allCrimes[i];			
			newObject.key = crimename;
			if(crimename === undefined){
				console.log("crimename undefined");
				continue;
			}
			

			for(let year = minYear; year <=maxYear; year++){
				let newValueObject = {};
				let numberOfCrimes = commonfunctions_namespace.getCrimerateByCrimeType(year, this.state, crimename, this.data);			
				newValueObject.year = year;
				newValueObject.crimerate = numberOfCrimes;
				values.push(newValueObject);
				newValueObject = {};
			}
			newObject.values = values;
			d3Data.push(newObject);
			newObject = {};
		}
		//console.log("d3Data", d3Data);

		return d3Data;
	}
	
	drawLineChart(){
		 let data = this.createD3Data();
		 this.createCoordinateSystem(data);
	}
	
	//https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
	createCoordinateSystem(jsondata){
		let data = JSON.parse(JSON.stringify(jsondata));
		let height = this.height;
        let width = this.width;
		let labelWidth = width/2;
		let labelHeight = labelWidth/2;
		let zooming = d3.zoom()
		    .scaleExtent([1, Infinity])
		    .translateExtent([[0, 0], [width, height]])
		    .extent([[0, 0], [width, height]])
		    .on("zoom", zoomed);
		let rootElement = this.rootElement.attr("width", width).attr("height", height).call(zooming);;
		let maxYear = config_namespace.CONSTANTS.maxYear;
		let minYear = config_namespace.CONSTANTS.minYear;
		let minCrime = 0;
		let maxCrime = 2000;
		var mindate = new Date(minYear,0,1),
            maxdate = new Date(maxYear,0,31);
		
		let margin = {top: 20, right: 20, bottom: 20, left: 40};
		let chartWidth = width - margin.left - margin.right;
		let chartHeight = height - margin.top - margin.bottom;		
		
		var xRange = d3.scaleTime().domain([mindate, maxdate]).range([0,chartWidth ]); 
		var yRange = d3.scaleLinear().domain([minCrime, maxCrime]).range([chartHeight, 0]);
		
		var xAxis = d3.axisBottom(xRange); 
		var yAxis = d3.axisLeft(yRange);	



			function zoomed() {					
			    var allLines = rootElement.selectAll(".lines")
			    	.transition().duration(750)
			        .attr("transform", d3.event.transform);		
			        console.log("Al". allLines);	
			    var line = d3.selectAll('.line').style("stroke-width", 2/d3.event.transform.k);			    
			    var xCall = xCoord.transition().duration(750).call(xAxis.scale(d3.event.transform.rescaleX(xRange)));
			    var yCall = yCoord.transition().duration(750).call(yAxis.scale(d3.event.transform.rescaleY(yRange)));
			  			
			}							 


		
		var coordinateSystem = rootElement.append("g").attr("class", "coordinateSystem")
											.attr("width", chartWidth)
											.attr("height", chartHeight)											
											.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							
		var xCoord =	coordinateSystem.append("g").attr("class", "xAxis")
										.attr("transform", "translate(0,"+chartHeight+")")																	
										.call(xAxis);	

		var yCoord =	coordinateSystem.append("g").attr("class", "yAxis")
										.attr("transform","translate(0,-"+margin.bottom+")")
										.call(yAxis);


		var simpleline = d3.line()
					.x(function(d,i){
						let year = parseInt(d.year),												
						date = new Date(year,0,1);						
						return xRange(date)})								 
					.y(function(d,i){						
						let crimerate = parseInt(d.crimerate); 
						return yRange(crimerate)});	


			
							
		var lines = rootElement.append("g").attr("class", "lines")
								.attr("width", chartWidth)
								.attr("height", chartHeight)	
								.attr("transform","translate(" + margin.left + "," + margin.top + ")")								
								.style("fill", "white");
			
		var lineSelection =rootElement.selectAll(".lines");
			

			lineSelection
			.selectAll("line")
			.data(data)
			.enter()
			.append("path")
			.attr("class", "line")
			.attr("d", function(d){
				let sl = simpleline(d.values);			
				return sl;
			})			
			.attr("stroke", function(d){
				let crime = d.key;
				return commonfunctions_namespace.getCrimeColor(crime);
			})
			.attr("fill","none");


       	}
	
}