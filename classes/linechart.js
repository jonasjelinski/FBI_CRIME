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
			if(crimename === undefined){
				console.log("crimename undefined");
				continue;
			}
			newObject.key = crimename;
			

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

		return d3Data;
	}
	
	drawLineChart(){
		 let data = this.createD3Data();
		 this.createCoordinateSystem(data);
	}
	
	//sources:
	//https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
	//https://bl.ocks.org/deristnochda/1ffe16ccf8bed2035ea5091ab9bb53fb
	createCoordinateSystem(jsondata){
		let data = JSON.parse(JSON.stringify(jsondata));
		let height = this.height;
        let width = this.width;
		let labelWidth = width/5;
		let labelHeight = labelWidth/5;
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
		
		let margin = {top: height/10, right: width/10, bottom: height/10, left: width/10};
		let chartWidth = width - margin.left - margin.right;
		let chartHeight = height - margin.top - margin.bottom;		
		
		var xRange = d3.scaleTime().domain([mindate, maxdate]).range([0,chartWidth ]); 
		var yRange = d3.scaleLinear().domain([minCrime, maxCrime]).range([chartHeight, 0]);
		
		var xAxis = d3.axisBottom(xRange); 
		var yAxis = d3.axisLeft(yRange);
		var deltaAxisY = chartHeight-margin.bottom;			 
						 
	
		var container = rootElement.append("svg").attr("class", "container")
									.attr("width", chartWidth)
									.attr("height", chartHeight)											
									.attr("transform", "translate(" + margin.left + "," + 0 + ")");							
		
		var coordinateSystem = rootElement.append("g").attr("class", "coordinateSystem")
											.attr("width", chartWidth)
											.attr("height", chartHeight)											
											.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							
		var xCoord = coordinateSystem.append("g").attr("class", "xAxis")
										.attr("transform", "translate(0,"+(deltaAxisY)+")")																	
										.call(xAxis);	

		var yCoord = coordinateSystem.append("g").attr("class", "yAxis")
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
							
		var lines = container.append("g").attr("class", "lines")
								.attr("width", chartWidth)
								.attr("height", chartHeight)																
								.style("fill", "white");
			
		var lineSelection = rootElement.selectAll(".lines");			

		lineSelection
		.selectAll("line")
		.data(data)
		.enter()
		.append("path")
		.attr("class", "line")		
		.attr("id", function(d){
			return d.key;
		})
		.attr("d", function(d){
			let sl = simpleline(d.values);			
			return sl;
		})			
		.attr("stroke", function(d){
			return getColor(d);
		})
		.attr("fill","none")
		.attr("opacity", 1);

		var labels = rootElement            
        .append('g')
        .attr("width", labelWidth)
        .attr("height", labelHeight)
        .attr('class', 'labels')       
        .attr('transform', 'translate(' + (width - 4*margin.right-labelWidth) + ',' + labelHeight + ')');

        labels.selectAll('g')
            .data(data)
            .enter().append('g').attr("class", "label");   
               
        labels.selectAll('g')
        .attr("class", function(d){return d.key})
        .append("text")
        .on("click", showLine)
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)               
        .attr("x", 0)
        .attr("y", function(d,i){return i*labelHeight*1.5;})           
        .attr("font-size", "50px")
        .style('fill', function(d){return getColor(d)})
        .text(function(d) { return d.key });

        function showLine(d){
        	let crime = d.key;
        	let id = "[id="+crime+"]";        
        	let line = d3.select(id);
        	let visible = parseInt(line.attr("opacity"));        	
        	let newOpacity = visible ? 0 : 1;        	
        	line.attr("opacity", newOpacity);        
        }

		function getColor(d){
			let crime = d.key;
			return commonfunctions_namespace.getCrimeColor(crime);
		}		 	

		function zoomed() {					
		    var allLines = rootElement.selectAll(".lines")
		    	.transition().duration(750)
		        .attr("transform", d3.event.transform);		
		        console.log("Al". allLines);	
		    var line = d3.selectAll('.line').style("stroke-width", 2/d3.event.transform.k);			    
		    var xCall = xCoord.transition().duration(750).call(xAxis.scale(d3.event.transform.rescaleX(xRange)));
		    var yCall = yCoord.transition().duration(750).call(yAxis.scale(d3.event.transform.rescaleY(yRange)));			  			
		}
    }
	
}