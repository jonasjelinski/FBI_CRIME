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
		console.log("d3Data", d3Data);

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
		let rootElement = this.rootElement.attr("width", width).attr("height", height);
		let maxYear = config_namespace.CONSTANTS.maxYear;
		let minYear = config_namespace.CONSTANTS.minYear;
		let minCrime = 0;
		let maxCrime = 2000;
		
		let margin = {top: 20, right: 20, bottom: 20, left: 40};
		let chartWidth = width - margin.left - margin.right;
		let chartHeight = height - margin.top - margin.bottom;
		let timeformat = d3.timeParse("%y");
		
		var xRange = d3.scaleTime().domain([minYear, maxYear]).range([0,chartWidth ]); 
		var yRange = d3.scaleLinear().domain([minCrime, maxCrime]).range([chartHeight, 0]);
		
		var xAxis = d3.axisBottom(xRange).tickFormat(d3.format(".2f"));
		var yAxis = d3.axisLeft(yRange);
		
		var coordinateSystem = rootElement.append("g").attr("class", "coordinateSystem")
											.attr("width", chartWidth)
											.attr("height", chartHeight)
											.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							
			coordinateSystem.append("g").attr("class", "xAxis")
										.attr("transform", "translate(0,"+chartHeight+")")
										
										//.style("fill", "black")
										.call(xAxis);	

			coordinateSystem.append("g").attr("class", "yAxis")
										//.attr("transform","translate(0,-"+margin.bottom+")")	
										//.style("fill", "black")
										.call(yAxis);


		var simpleline = d3.line()
					.x(function(d,i){
						let year = parseInt(d.year);							
						//console.log("linedata x", d.year); 
						return xRange(year)})								 
					.y(function(d,i){
						//console.log("linedata y", d.crimerate);
						let crimerate = parseInt(d.crimerate); 
						return yRange(crimerate)});								 


							
		var lines = rootElement.append("g").attr("class", "lines")
								.attr("width", chartWidth)
								.attr("height", chartHeight)	
								.attr("transform","translate(" + margin.left + "," + margin.top + ")")
								//.append("rect").attr("width", chartWidth).attr("height", chartHeight)
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
				//console.log("sl ",sl);
				return sl;
			})
			//.attr("stroke-width", 2)
			.attr("stroke", function(d){
				let crime = d.key;
				return commonfunctions_namespace.getCrimeColor(crime);
			})
			.attr("fill","none");

       	}
	
}